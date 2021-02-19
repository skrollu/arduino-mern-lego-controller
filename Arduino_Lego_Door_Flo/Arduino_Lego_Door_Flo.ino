#include <Servo.h>
#include <LiquidCrystal.h>
#define LED_PIN 13

Servo servo;
const int servoPin = 3;
const int startAngle = 0;
const int endAngle = 180;
int currentAngle = 0;

int bouton = 8;                       // déclare le bouton poussoir sur la PIN 8.
int etatbouton = 0;                   // variable représentant le bouton, soit ouvert ou fermé, ici au départ à 0 donc fermé.

LiquidCrystal lcd(12, 10, 6, 7, 5, 4);


void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  servo.attach(servoPin);
  servo.write(0);
  Serial.println("0");
  currentAngle = 0;
  pinMode(LED_PIN, OUTPUT);


  lcd.clear();
  lcd.print("door close!");
}

void loop() {
  // reply only when you receive data:
  if (Serial.available() > 0) {
    unsigned char inChar = (unsigned char)Serial.read();
    openCloseDoor(inChar);
  }
  
  etatbouton = digitalRead(bouton); // On lit l’état du bouton pour savoir s’il est ouvert ou fermé

  if (etatbouton == HIGH)
  { // Si la variable “etatbouton” est ouverte, à l’état haut, donc laisse passer le courant.

    switch (currentAngle)
    {
    case startAngle:
      servo.write(endAngle);
      currentAngle = endAngle;
      lcd.clear();
      lcd.print("door open!");
      delay(1000);
      break;
    case endAngle:
      servo.write(startAngle);
      currentAngle = startAngle;
      lcd.clear();
      lcd.print("door close!");
      delay(1000);
      break;
    default:
      delay(1000);
      break;
    }
  }
}

void openCloseDoor(unsigned char onOff) {
  switch (onOff) {
    case '0':
      digitalWrite( LED_PIN, LOW );
      servo.write(startAngle);
      lcd.clear();
      lcd.print("door close!");
      Serial.println("0");
      break;
    case '1':
      digitalWrite( LED_PIN, HIGH );
      servo.write(endAngle);
      Serial.println("1");
      lcd.clear();
      lcd.print("door open!");
      break;
    default:
      Serial.print("Error");
  }
}
