module.exports = {
  networks: {
    development: {
     host: "ganache",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

  },
  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.8.16",
    }
  },
};
