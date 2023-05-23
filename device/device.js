module.exports = function (RED) {
  function NukiMQTTDevice(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.id = config.id;
    node.name = config.name;
    /** @type {MQTTBrokerNode}*/
    node.broker = config.broker;
  }

  RED.nodes.registerType("nuki-mqtt-device", NukiMQTTDevice);
};
