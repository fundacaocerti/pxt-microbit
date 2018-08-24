#include "pxt.h"

using namespace pxt;

namespace sensors {

  //%
  uint32_t speedServoMotor(int value, int direction) {
    return (uint32_t) value;
  }

  //%
  bool isOnOffButton(bool value) {
    // Invert the return of the button on micro:bit because it is active-low
    return !value;
  }
}