module.exports = function (RED) {
  "use strict";

  function NukiMQTTLockEvent(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.log("NukiMQTTLockEvent log");
    node.warn("NukiMQTTLockEvent warn");
    node.error("NukiMQTTLockEvent error");

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

    node.status({
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

    node.brokerConn.register(node);
    node.on("close", function (removed, done) {
      if (node.brokerConn) {
        node.brokerConn.unsubscribe(
          `nuki/${node.device.id}/lockActionEvent`,
          node.id,
          removed
        );
        node.brokerConn.deregister(node, done, removed);
        node.brokerConn = null;
      } else {
        done();
      }
    });

    node.log(`connect: subscibe to nuki/${node.device.id}/lockActionEvent`);
    node.brokerConn.subscribe(
      `nuki/${node.device.id}/lockActionEvent`,
      {},
      function (topic, payload, packet) {
        // convert payload from buffer to string
        payload = payload.toString();
        node.warn({ topic, payload, packet });
      },
      node.id
    );

    // if (node.brokerConn) {
    //     node.brokerConn.on("connect", function () {
    //       node.warn(`connect: subscibe to nuki/${node.device.id}/lockActionEvent`);
    //       node.brokerConn.subscribe(`nuki/${node.device.id}/lockActionEvent`);
    //     });

    //     node.brokerConn.on("message", function (topic, payload) {
    //       node.warn("message received");
    //       const data = JSON.parse(message.toString());
    //       msg.topic = topic;
    //       msg.payload = payload;
    //       msg.data = data;
    //       node.send(msg);
    //     });
    // }

    // // Subscribe to Nuki events topic
    // client.on("connect", function () {
    //   client.subscribe("nuki/events");
    // });

    // // Handle incoming messages
    // client.on("message", function (topic, message) {
    //   // Parse message as JSON
    //   const data = JSON.parse(message.toString());

    //   // Check if message is a Nuki event
    //   if (data.nukiId && data.type) {
    //     // Send message to next node in flow
    //     node.send({ payload: data });
    //   }
    // });

    // // Disconnect from MQTT broker when node is stopped
    // node.on("close", function () {
    //   client.end();
    // });
  }

  RED.nodes.registerType("nuki-mqtt-lock-event", NukiMQTTLockEvent);
};
