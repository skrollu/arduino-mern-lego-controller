#include <Servo.h>
#define LED_PIN 13

Servo servo;
const int servoPin = 3;
const int startAngle = 0;
const int endAngle = 180;

void setup() {
  Serial.begin(9600);
  servo.attach(servoPin);
  servo.write(0);
  Serial.println("0");
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // reply only when you receive data:
  if (Serial.available() > 0) {
     unsigned char inChar = (unsigned char)Serial.read();
     openCloseDoor(inChar);
  }
}

void openCloseDoor(unsigned char onOff) {
   switch (onOff) {
    case '0':
      digitalWrite( LED_PIN, LOW );
      servo.write(startAngle);
      Serial.println("0");
      break;
    case '1':
      digitalWrite( LED_PIN, HIGH );
      servo.write(endAngle);
      Serial.println("1");
      break;
    default:
      Serial.print("Error");
  }
}
