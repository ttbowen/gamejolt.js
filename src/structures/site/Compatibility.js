'use strict';

/**
 * Represents Compatibility Object
 * @class Compatibility
 */
class Compatibility {

    
    /**
     * Creates an instance of Compatibility.
     * 
     * @param {Client} client Game Jolt client
     * @param {any} data The compatibility data
     * 
     * @constructor
     */
    constructor(client, data) {
        this.client = client;
        if (data) this.setup(data);
    }

    setup(data) {
        this.gameId = data.game_id;
        this.id = data.id;
        this.osWindows = data.os_windows;
        this.osWindows64 = data.os_windows_64;
        this.osLinux = data.os_linux;
        this.osLinux64 = data.os_linux_64;
        this.osMac = data.os_mac;
        this.osMax64 = data.os_mac_64;
    }
}

module.exports = Compatibility;