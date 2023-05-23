module.exports = function (RED) {
  "use strict";
  const { actions } = require("../utils");

  function NukiMQTTLockAction(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.action = config.action;
    node.device = RED.nodes.getNode(config.device);
    if (!node.device) {
      node.warn("No device configured");
      node.status({
        fill: "red",
        shape: "ring",
        text: "No device configured",
      });
      return;
    }

    node.broker = node.device.broker;
    /** @type {MQTTBrokerNode}*/
    node.brokerConn = RED.nodes.getNode(node.broker);
    if (!node.brokerConn) {
      node.error("No MQTT Broker configured");
      return;
    }

    this.status({
      fill: "red",
      shape: "ring",
      text: "node-red:common.status.disconnected",
    });

    if (node.brokerConn.connected) {
      node.status({
        fill: "green",
        shape: "dot",
        text: "node-red:common.status.connected",
      });
    }

    node.on("input", function (msg, _send, done) {
      const actionId = actions[msg.payload] || node.action;

      node.brokerConn.publish(
        { topic: `nuki/${node.device.id}/lockAction`, payload: `${actionId}` },
        function (err) {
          if (err && err.warn) {
            node.warn(err);
            return;
          }
          done(err);
        }
      );
    });

    node.brokerConn.register(node);
    node.on("close", function (removed, done) {
      if (node.brokerConn) {
        node.brokerConn.deregister(node, done, removed);
        node.brokerConn = null;
      } else {
        done();
      }
    });
  }
  RED.nodes.registerType("nuki-mqtt-lock-action", NukiMQTTLockAction);
};
