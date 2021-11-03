# Arduino Notes

## Lessons Learned
- What is `\n` ?
  - new line. moves the active position to the initial position of the next line
- What is `\r` ?
  - carriage return. Moves the active position to the initial position of the current line
- What goes on the following loop `while(client.available())`?
   - Reads in one character at a time before looping again
- Do you need to skip the http headers from the wificlient input stream?
  - Yes, the input to the arduinoJson library should only be json. otherwise it won't work 
- What does the `F()` function do when inside of a `Serial.print()`?
  - It moves constant strings to memory instead of ram. This will take up more program space but free up dynamic memory (ram). 


### Example for arduinoJson libray use from the web assistant

        // Stream& input;

        StaticJsonDocument<32> filter;

        JsonObject filter_animations_0 = filter["animations"].createNestedObject();
        filter_animations_0["name"] = true;
        filter_animations_0["delay"] = true;

        StaticJsonDocument<512> doc;

        DeserializationError error = deserializeJson(doc, input, DeserializationOption::Filter(filter));

        if (error) {
          Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
              return;
              
        }

        for (JsonObject animations_item : doc["animations"].as<JsonArray>()) {

          const char* animations_item_name = animations_item["name"]; // "rainbow", "blink", "rainbow", "rainbow", ...
            long long animations_item_delay = animations_item["delay"]; // 12345, 1111111111111111, 45554, 1, 222, ...

            
        }

