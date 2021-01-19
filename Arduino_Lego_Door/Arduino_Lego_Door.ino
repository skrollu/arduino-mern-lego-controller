#include <Servo.h>

#define LED_PIN 13

Servo servo;
const int servoPin = 3;
const int potPin = A0;

void setup() {
  Serial.begin(9600);
  servo.attach(servoPin);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  /*
  int potValue = analogRead(potPin);
  int angle = map(potValue, 0, 1023, 0, 180);
  servo.write(angle);
  
  Serial.println(angle);
  */
   while (Serial.available()) {
     unsigned char inChar = (unsigned char)Serial.read();
     process(inChar);
  }
}

void process( unsigned char  onOff) {
   Serial.println(onOff);
   switch (onOff) {
    case '0':
      digitalWrite( LED_PIN, LOW );
      Serial.println("Eteint");
      delay(1000);
      break;
    case '1':
      digitalWrite( LED_PIN, HIGH );
      Serial.println("Allumé");
      delay(1000);
      break;
    default:
      Serial.print("error");
  }
}
