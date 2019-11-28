//var MPU6050 = require('i2c-mpu6050');
var i2c = require('i2c-bus');
var async = require('async');

var i2c1 = i2c.openSync(1);

// Sensor https://www.invensense.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf

// Registers
var PWR_MGMT_1 = 0x6b;
var PWR_MGTM_2 = 0x6c;
var ACL_XOUT = 0x3b;
var ACL_YOUT = 0x3d;
var ACL_ZOUT = 0x3f;
var TMP_OUT = 0x41;
var GYRO_XOUT = 0x43;
var GYRO_YOUT = 0x45;
var GYRO_ZOUT = 0x47;

// Sensitivity
var ACL_SENSITIVITY = 16384;
var GYRO_SENSITIVITY = 131;

// Address
var address = 0x68;

// Functions
function scale(data, sensitivity) {
  var scale = {};
  for (var axis in data) {
    scale[axis] = data[axis] / sensitivity;
  }
  return scale;
};

function read(register, done) {
  var high = this.i2c1.readByteSync(this.address, register);
  var low = this.i2c1.readByteSync(this.address, register + 1);
  var data = (high << 8) + low;
  if (data >- 0x8000) {
    return -((65535 - data) + 1);
  } else {
    return data;
  }
};

function readGyro() {
    var json = {
      x: this.read(GYRO_XOUT),
      y: this.read(GYRO_YOUT),
      z: this.read(GYRO_ZOUT)
    };
    json = scale(json, GYRO_SENSITIVITY);
    return json;
};

function fetch() {
  var gyro = this.readGyro();
  return {
    gyro: gyro
  };
};

// Actual code that runs
i2c1.writeByteSync(address, PWR_MGMT_1, 0);
var data = this.fetch();
console.log(data);
console.log('Printed data');
i2c1.closeSync();
