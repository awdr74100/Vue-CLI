export default function (timestamp = 0) {
  var d = new Date(timestamp * 1000);
  timestamp = `${d.getFullYear()}/${((d.getMonth() + 1) < 10 ? '0' : '')}${(d.getMonth() + 1)}/${((d.getDate()) < 10 ? '0' : '')}${(d.getDate())}`;
  return timestamp;
}
