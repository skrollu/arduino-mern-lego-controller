#include <Servo.h>

Servo servo;
const int servoPin = 3;
const int potPin = A0;

void setup() {
  Serial.begin(9600);
  servo.attach(servoPin);
}

void loop() {
  int potValue = analogRead(potPin);
  int angle = map(potValue, 0, 1023, 0, 180);
  servo.write(angle);
  
  Serial.println(angle);
}
