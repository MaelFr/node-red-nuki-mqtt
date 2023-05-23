# Nuki MQTT

A Node-RED node to control your Nuki device through MQTT.

## References

Based on the [MQTT API Specification v1.4](https://developer.nuki.io/uploads/short-url/fcR2ntjSFMz3oHUMrIjYSU3g0O4.pdf), found on the [Nuki Developer forum](https://developer.nuki.io/t/mqtt-api-specification-v1-4/19223).

## Installation

To install this node, run the following command in your Node-RED user directory (typically ~/.node-red):

```bash
npm install @maelfr/node-red-nuki-mqtt
```

## Usage

### Lock Action Node

This node allows you to control your Nuki device through MQTT. You can configure the device and action in the node, or set them dynamically using the `msg.payload` property.

#### Input

| Field   | Description           |
| ------- | --------------------- |
| payload | the action to publish |

#### Details

The action can be configured in the node or, if left blank, can be set by `msg.payload`. The following actions are supported:

- UNLOCK
- LOCK
- UNLATCH
- LOCK_N_GO
- LOCK_N_GO_WITH_UNLATCH
- FULL_LOCK

### Device configuration Node

| Field       | Description                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Name        | A friendly name for the device                                                                                               |
| ID          | The Nuki ID in hexadecimal format is printed on the device itself and also shown in the device administration. e.g. 2BB28570 |
| MQTT Broker | The MQTT broker to use                                                                                                       |

## License

This node is licensed under the MIT License. See the LICENSE file for more information.

## Credits

This node was created by Maël Bernero.
