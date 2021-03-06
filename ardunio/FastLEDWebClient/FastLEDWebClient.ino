/*
   Fast LED Web client

   This sketch connects to the arduino neopixel api
   using the WiFi module. It uses the FastLED library to control a string
   of RGB LEDs

   This sketch is written for a network using WPA encryption. For
   WEP or WPA, change the WiFi.begin() call accordingly.

Circuit:
 * Board with NINA module (Arduino UNO WiFi Rev.2)
 * WS2812 LED strip (any length)

 Based off WifiWebClient example

 by Diego E. R.
 */


#include <SPI.h>
#include <WiFiNINA.h>
#include <FastLED.h>
//Needed if storing the ID of the animation
#define ARDUINOJSON_USE_LONG_LONG 1 
#include <ArduinoJson.h>
#include "arduino_secrets.h" 

/****************** WiFI Client Settings  ******************/
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key index number (needed only for WEP)

int status = WL_IDLE_STATUS;
// if you don't want to use DNS (and reduce your sketch size)
// use the numeric IP instead of the name for the server:
//IPAddress server(74,125,232,128);  // numeric IP for Google (no DNS)
char server[] = "arduino-neopixel-app.herokuapp.com";    // name address for this heroku app
int port = 80;

// Initialize the WiFi client library
WiFiClient client;

/****************** LED Strip Settings  ******************/
// How many leds in your strip? How bright (Max: 255)?
#define NUM_LEDS 50 
#define BRIGHTNESS 95

// For led chips like Neopixels, which have a data line, ground, and power, you just
// need to define DATA_PIN.  For led chipsets that are SPI based (four wires - data, clock,
// ground, and power), like the LPD8806, define both DATA_PIN and CLOCK_PIN
#define DATA_PIN 6
//#define CLOCK_PIN 13
#define LED_TYPE WS2812
#define COLOR_ORDER RGB

// Define the array of leds
CRGB leds[NUM_LEDS];


/****************** ArduinoJson Settings  ******************/
StaticJsonDocument<48> filter;
StaticJsonDocument<768> doc;


/****************** Program Start  ******************/
void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
    Serial.println("Please upgrade the firmware");
  }

  Serial.println("Starting LEDs");
  //Initialize the LED strip. Use ypical8mmPixel or TypicalPixelString for setCorrection
  LEDS.addLeds<LED_TYPE,DATA_PIN,COLOR_ORDER>(leds, NUM_LEDS).setCorrection(Typical8mmPixel); 
  LEDS.setBrightness(BRIGHTNESS);

  fill_solid(leds, NUM_LEDS, CRGB::Red);
  FastLED.show();
  // attempt to connect to WiFi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(50000);
  }
  Serial.println("Connected to WiFi");
  printWifiStatus();

  Serial.println("\nStarting connection to server...");
  // if you get a connection, report back via serial:
  if (client.connect(server, port)) {
    Serial.println("connected to server");
    // Make a HTTP request:
    // client.println("GET /api/devices/1 HTTP/1.1");
    client.println("GET /api/v1/animations HTTP/1.1");
    client.print("Host: ");
    client.println(server);
    client.println("Connection: close");
    client.println();
  }
}


/***** FastLED List of Animations *****/
// List of patterns to cycle through.  Each is defined as a separate function below.
typedef void (*SimplePatternList[])();
SimplePatternList gPatterns = { rainbow, cylon, blink};
uint8_t gCurrentPatternNumber = 0; // Index number of which pattern is current
uint8_t gHue = 0; // rotating "base color" used by many of the patterns
//Array to hold the animations in order but stored as numbers.
//Var to keep track of the number of animations. Max is 30.
uint8_t animationsCount = 0;
uint8_t animationsList[30];

/*************** The main LOOP ***************/
void loop() {
  bool gotStatus = false;
  bool gotHeaders = false;
  bool gotJson = false;

  // if there are incoming bytes available
  // from the server, read them and print them:
  while (client.available()) {
    
    //Check HTTP status
    if(!gotStatus){
      Serial.println("checking the response status...");
      char status[32] = {0};
      client.readBytesUntil('\r', status, sizeof(status));
      Serial.print(status);
      Serial.println(" was the status.");
      gotStatus = true;
    }
    
    //Skip HTTP headers
    if(!gotHeaders){
      Serial.println("Checking headers...");
      char endOfHeaders[] = "\r\n\r\n";
      //Serial.println(client.readStringUntil(endOfHeaders)); 
      if(client.find(endOfHeaders)){
        Serial.println("got them headers");
      } 
      gotHeaders = true;
    }

    //Start using JSON
    if(gotStatus && gotHeaders && !gotJson){
      Serial.println("Getting JSON");
      
      //Setting up filter     
      JsonObject filter_animations_0 = filter["animations"].createNestedObject();
      filter_animations_0["name"] = true;
      filter_animations_0["delay"] = true;
      
      Serial.println("Here is the filter:");
      serializeJsonPretty(filter, Serial);

      //Read the JSON into the JSON object
      DeserializationError error = deserializeJson(doc, client, DeserializationOption::Filter(filter));

      if(error) {
        //Serial.print(F("deserializeJson() failed: "));
        Serial.print("deserializationJson() failed: ");
        Serial.println(error.f_str());
        gotJson = true;
        return;
      }
      Serial.print("\n Error was: ");
      Serial.println(error.f_str());


      Serial.println("Here is the doc: ");
      serializeJsonPretty(doc, Serial);
      
      // Serial.print(doc["animations"].as<const char*>());
     
   
      Serial.print(sizeof(animationsList)/sizeof(uint8_t));
      
      for (JsonObject animations_item : doc["animations"].as<JsonArray>()) {
        const char* animations_item_name;
        long long animations_item_delay;
        if(animationsCount >= 30){
          Serial.print("too many animations");
          //animationsCount--;
          break;
        }
        animations_item_name = animations_item["name"]; // "rainbow", "blink", "rainbow", "rainbow",
        animations_item_delay = animations_item["delay"]; // 12345, 1111111111111111, 45554, 1, 222, 
        Serial.print("Printing animations one by one: ");
        Serial.println(animations_item_name);
      // Serial.print(" : ");
      // Serial.println(animations_item_delay);
        //const char* animations_item_name = animations_item["name"]; // "rainbow", "blink", "rainbow", "rainbow",
        //long long animations_item_delay = animations_item["delay"]; // 12345, 1111111111111111, 45554, 1, 222, 
        if(strcmp(animations_item_name,"rainbow") == 0){
          animationsList[animationsCount++] = 0;
          Serial.println("Rainbow animation");
        }
        else if(strcmp(animations_item_name,"cylon") == 0){
          animationsList[animationsCount++] = 1;
          Serial.println("cylon animation");
        }
        else if(strcmp(animations_item_name,"blink") == 0){
          animationsList[animationsCount++] = 2;
          Serial.println("blink animation");
        }
        
      }   
      //printing the animations converted
      Serial.print("Total animations: ");
      Serial.println(animationsCount);
      Serial.print("Animations array: ");
      for(uint8_t i=0; i<animationsCount; i++){
        Serial.print(animationsList[i]);
        Serial.print(" , ");
      }
      Serial.println("");

     
      gotJson = true;
    }
    
    //char c = client.read();
    //Serial.write(c);
  }
  
  Serial.println("Data from client not available");
  


  // if the server's disconnected, stop the client:
  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting from server.");
    client.stop();

    // Control the LEDs forever
    while (true){
      // Call the current pattern function once, updating the 'leds' array
      gPatterns[animationsList[gCurrentPatternNumber]]();

      // send the 'leds' array out to the actual LED strip
      FastLED.show();  
      // insert a delay to keep the framerate modest
      FastLED.delay(1000/120); 

      // do some periodic updates
      EVERY_N_MILLISECONDS( 20 ) { gHue++; } // slowly cycle the "base color" through the rainbow
      EVERY_N_SECONDS( 5 ) { nextPattern(); } // change patterns periodically

    }
  }
}


void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

/***** FastLED Animation Functions *****/
#define ARRAY_SIZE(A) (sizeof(A) / sizeof((A)[0]))

void nextPattern(){
  // add one to the current pattern number, and wrap around at the end
  //gCurrentPatternNumber = (gCurrentPatternNumber + 1) % ARRAY_SIZE( gPatterns);
  //iterate through the animationslist one by one and wrap at the end
  
  gCurrentPatternNumber = (gCurrentPatternNumber + 1) % animationsCount;
  
}

void fadeall(){
  for(int i = 0; i < NUM_LEDS; i++){
    leds[i].nscale8(250); 
  } 
}

void rainbow() 
{
  // FastLED's built-in rainbow generator
  fill_rainbow( leds, NUM_LEDS, gHue, 7);
  FastLED.show();
}

void cylon(){
  static uint8_t hue = 0;
  //Serial.print("x");
  // First slide the led in one direction
  for(int i = 0; i < NUM_LEDS; i++) {
    // Set the i'th led to red 
    leds[i] = CHSV(hue++, 255, 255);
    // Show the leds
    FastLED.show(); 
    // now that we've shown the leds, reset the i'th led to black
    // leds[i] = CRGB::Black;
    fadeall();
    // Wait a little bit before we loop around and do it again
    delay(10);
  }
  //Serial.print("x");

  // Now go in the other direction.  
  for(int i = (NUM_LEDS)-1; i >= 0; i--) {
    // Set the i'th led to red 
    leds[i] = CHSV(hue++, 255, 255);
    // Show the leds
    FastLED.show();
    // now that we've shown the leds, reset the i'th led to black
    // leds[i] = CRGB::Black;
    fadeall();
    // Wait a little bit before we loop around and do it again
    delay(10);
  }   

}


void blink(){
  fill_solid(leds, NUM_LEDS, CHSV(gHue, 255, 255));
  FastLED.show();   
  delay(300);
  fill_solid(leds, NUM_LEDS, CRGB(0, 0, 0));
  FastLED.show();    
  delay(300);
}
