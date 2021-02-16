#include <Servo.h>
#define LED_PIN 13

/* Constantes pour les broches */
#define TRIGGER_PIN  2 // Broche TRIGGER
#define ECHO_PIN 11    // Broche ECHO

/* Constantes pour le timeout */
const unsigned long MEASURE_TIMEOUT = 25000UL; // 25ms = ~8m à 340m/s

/* Vitesse du son dans l'air en mm/us */
const float SOUND_SPEED = 340.0 / 1000;

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

  /* Initialise les broches du capteur de distance */
  pinMode(TRIGGER_PIN, OUTPUT);
  digitalWrite(TRIGGER_PIN, LOW); // La broche TRIGGER doit être à LOW au repos
  pinMode(ECHO_PIN, INPUT);

}

void loop() {
  // reply only when you receive data:
  if (Serial.available() > 0) {
    unsigned char inChar = (unsigned char)Serial.read();
    openCloseDoor(inChar);
  }

  float distance_mm = initSensorDistance();
   Serial.println(servo.read());
  if (distance_mm > 50.0) { //ouverture
    // permet de lire l'angle actuel du servo moteur (pour éviter de bloquer le moteur) si le servo n'a pas fini 
    // => fonctionne pa très bien car on passe de 0 a 180 directement pas d'intermediaire
    if (servo.read() == startAngle) 
      openCloseDoor('1');
  }else{ //fermeture
     if (servo.read() == endAngle)
      openCloseDoor('0');
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


float initSensorDistance()
{
  /* 1. Lance une mesure de distance en envoyant une impulsion HIGH de 10µs sur la broche TRIGGER */
  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN, LOW);

  /* 2. Mesure le temps entre l'envoi de l'impulsion ultrasonique et son écho (si il existe) */
  long measure = pulseIn(ECHO_PIN, HIGH, MEASURE_TIMEOUT);

  /* 3. Calcul la distance à partir du temps mesuré */
  float distance_mm = measure / 2.0 * SOUND_SPEED;
  return distance_mm;
}
