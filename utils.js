const lockStates = {
  0: "uncalibrated",
  1: "locked",
  2: "unlocking",
  3: "unlocked",
  4: "locking",
  5: "unlatched",
  6: "unlocked lock'n'go",
  7: "unlatching",
  254: "motor blocked",
  255: "undefined",
};

const actions = {
  UNLOCK: 1,
  LOCK: 2,
  UNLATCH: 3,
  LOCK_N_GO: 4,
  LOCK_N_GO_WITH_UNLATCH: 5,
  FULL_LOCK: 6,
  //   FOB: 80, // not supported
  //   BUTTON: 90, // not supported
};

const doorsensorStates = {
  1: "deactivated",
  2: "door closed",
  3: "door opened",
  4: "door state unknown",
  5: "calibrating",
  16: "uncalibrated",
  210: "tampered",
  255: "unknown",
};

const trigger = {
  0: "system/bluetooth command",
  2: "button",
  3: "automatic",
  6: "auto lock",
  171: "HomeKit",
  172: "MQTT",
};

module.exports = { actions, lockStates, doorsensorStates, trigger };
