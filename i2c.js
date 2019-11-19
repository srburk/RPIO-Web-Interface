var MPU6050 = require('i2c-mpu6050');
var i2c = require('i2c-bus');

const MPU_ADDR = 0x68;
//const GYRO_X_REG = 0x43;

//const processData = rawData => {
//	rawData = (rawData >>8) + ((rawData & 0xff) << 8);
//	let value = (rawData & 0x0fff) / 16;
//	return value;
//};

//i2c.openPromisified(1).
//then(i2c1 => i2c1.readWord(MPU_ADDR, GYRO_X_REG).
//  then(rawData => console.log(processData(rawData))).
//  then(_ => i2c1.close())
//).catch(console.log);

const i2c1 = i2c.openSync(1);
const sensor = new MPU6050(i2c1, MPU_ADDR);
const data = sensor.readSync();
i2c1.closeSync();
console.log(data);
