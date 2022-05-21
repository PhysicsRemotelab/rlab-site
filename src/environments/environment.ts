export const production = false;
export const domain = 'remotelab.eu.auth0.com';
export const clientId = '5MROr4sw5rIlD73DXcb6051wQZqi4M53';
export const audience = 'https://remotelab.ee/';

export const apiUrl = 'http://localhost:4000/api/v1';
export const cameraUrl = 'http://localhost:80';
export const sensorUrl = 'ws://localhost:80';

export const lab1Camera = `${cameraUrl}/cam/0`;
export const lab1CameraPixels = `${cameraUrl}/camera/0`;
export const lab2Camera = `${cameraUrl}/cam/1`;
export const lab3Camera = `${cameraUrl}/cam/1`;
export const lab4Camera = `${cameraUrl}/cam/1`;
export const lab5Camera = `${cameraUrl}/cam/1`;
export const lab6Camera = `${cameraUrl}/cam/0`;
export const lab6CameraPixels = `${cameraUrl}/camera/0`;

export const lab1Sensor = `${sensorUrl}/diode`;
export const lab2Sensor = `${sensorUrl}/spectrometer`;
export const lab3Sensor = `${sensorUrl}/gamma`;
export const lab4Sensor = `${sensorUrl}/fluorescence-sensor`;
export const lab4Commands = `${sensorUrl}/fluorescence-commands`;
export const lab5Sensor = `${sensorUrl}/resistance`;
export const lab6Sensor = `${sensorUrl}/diffraction`;
