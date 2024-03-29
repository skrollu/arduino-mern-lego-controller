#include <Servo.h>
#define LED_PIN 13

Servo servo;
const int servoPin = 3;
const int startAngle = 0;
const int endAngle = 180;
int currentAngle = 0;

int bouton = 8;                       // déclare le bouton poussoir sur la PIN 8.
int etatbouton = 0;                   // variable représentant le bouton, soit ouvert ou fermé, ici au départ à 0 donc fermé.

void setup() {
  Serial.begin(9600);
  servo.attach(servoPin);
  servo.write(0);
  Serial.println("0");
  currentAngle = startAngle;
  pinMode(LED_PIN, OUTPUT);
  pinMode (bouton, INPUT) ;             // on indique que le bouton est une entrée.
}

void loop() {
  etatbouton = digitalRead (bouton);  // On lit l’état du bouton pour savoir s’il est ouvert ou fermé

  if (etatbouton==HIGH) {            // Si la variable “etatbouton” est ouverte, à l’état haut, donc laisse passer le courant. "On appuie sur le bouton"
    switch(currentAngle){
      case startAngle:
        servo.write(endAngle);
        currentAngle = endAngle;
        Serial.println('1');
        delay(1000);
        break;
      case endAngle: 
        servo.write(startAngle);
        currentAngle = startAngle;
        Serial.println('0');
        delay(1000);
        break;
      default:
        delay(1000);
        break;
    }
  }
  
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
      currentAngle = startAngle;
      Serial.println("0");
      break;
    case '1':
      digitalWrite( LED_PIN, HIGH );
      servo.write(endAngle);
      currentAngle = endAngle;
      Serial.println("1");
      break;
    case '2':
      if(currentAngle == startAngle) {
          Serial.println("4"); // La porte est fermée
      } else {
          Serial.println("3"); // La porte est ouverte
      }
      break;
    default:
      Serial.print("Error");
  }
}
