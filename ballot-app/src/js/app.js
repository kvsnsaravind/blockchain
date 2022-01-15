App = {
  web3Provider: null,
  contracts: {},
  names: new Array(),
  url: "http://127.0.0.1:7545",
  chairPerson: null,
  currentAccount: null,
  init: function () {
    /*$.getJSON('../proposals.json', function(data) {
      var proposalsRow = $('#proposalsRow');+
      var proposalTemplate = $('#proposalTemplate');

      for (i = 0; i < data.length; i ++) {
        proposalTemplate.find('.panel-title').text(data[i].name);
        proposalTemplate.find('img').attr('src', data[i].picture);
        proposalTemplate.find('.btn-vote').attr('data-id', data[i].id);

        proposalsRow.append(proposalTemplate.html());
        App.names.push(data[i].name);
      }
    });*/
    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there is an injected web3 instance?
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider(App.url);
    }
    web3 = new Web3(App.web3Provider);

    ethereum.enable();

    //App.populateAddress();
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("CarMarketplace.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var voteArtifact = data;
      App.contracts.car = TruffleContract(voteArtifact);

      // Set the provider for our contract
      App.contracts.car.setProvider(App.web3Provider);

      //App.getChairperson();
      return App.bindEvents();
    });
  },

  bindEvents: function () {
    //$(document).on('click', '.btn-vote', App.handleVote);
    //$(document).on('click', '#button11id', App.registerseller);
    //$(document).on('click', '#register', function(){ var ad = $('#enter_address').val(); App.handleRegister(ad); });
    $(document).on("click", "#button11id", function () {
      var sellerAddress = $("#text11id").val();
      App.handleRegisterSeller(sellerAddress);
    });
    $(document).on("click", "#button12id", function () {
      var sellerAddress = $("#text12id").val();
      App.handleUnregisterSeller(sellerAddress);
    });
    $(document).on("click", "#button21id", function () {
      var buyerAddress = $("#text21id").val();
      App.handleRegisterBuyer(buyerAddress);
    });
    $(document).on("click", "#button22id", function () {
      var buyerAddress = $("#text22id").val();
      App.handleUnregisterBuyer(buyerAddress);
    });

    $(document).on("click", "#buttonbuy1", function () {
      var sellerAddress = $("#text11id").val();
      App.buyCar1(sellerAddress);
    });
    $(document).on("click", "#buttonbuy2", function () {
      var sellerAddress = $("#text11id").val();
      App.buyCar2(sellerAddress);
    });
    // $(document).on("click", "#buttonbuy3", function () {
    //   var sellerAddress = $("#text11id").val();
    //   App.buyCar3(sellerAddress);
    // });
    // $(document).on("click", "#buttonbuy4", function () {
    //   var sellerAddress = $("#text11id").val();
    //   App.buyCar4(sellerAddress);
    // });
    
  },

  handleRegisterSeller: function (sellerAddress) {
    var licenseInstance;
    console.log(sellerAddress);
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];
      App.contracts.car
        .deployed()
        .then(function (instance) {
          licenseInstance = instance;
          return licenseInstance.registerSeller(sellerAddress, {
            from: account,
          });
        })
        .then(function (result, err) {
          if (result) {
            if (parseInt(result.receipt.status) == 1)
              alert(sellerAddress + " " + "registration done successfully");
            else
              alert(
                sellerAddress +
                  " registration not done successfully due to revert"
              );
          } else {
            alert(sellerAddress + " registration failed");
          }
        });
    });
  },

  handleUnregisterSeller: function (sellerAddress) {
    var instance1;
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];
      App.contracts.car
        .deployed()
        .then(function (instance) {
          instance1 = instance;
          return instance1.unregisterSeller(sellerAddress, { from: account });
        })
        .then(function (result, err) {
          if (result) {
            if (parseInt(result.receipt.status) == 1)
              alert(sellerAddress + " " + "unregistration done successfully");
            else
              alert(
                sellerAddress +
                  "unregistration not done successfully due to revert"
              );
          } else {
            alert(sellerAddress + "unregistration failed");
          }
        });
    });
  },

  handleRegisterBuyer: function (buyerAddress) {
    var instance2;
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];
      App.contracts.car
        .deployed()
        .then(function (instance) {
          instance2 = instance;
          return instance2.registerBuyer(buyerAddress, { from: account });
        })
        .then(function (result, err) {
          if (result) {
            if (parseInt(result.receipt.status) == 1)
              alert(buyerAddress + " " + "registration done successfully");
            else
              alert(
                buyerAddress +
                  "registration not done successfully due to revert"
              );
          } else {
            alert(buyerAddress + "registration failed");
          }
        });
    });
  },

  handleUnregisterBuyer: function (buyerAddress) {
    var instance3;
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];
      App.contracts.car
        .deployed()
        .then(function (instance) {
          instance3 = instance;
          return instance3.unregisterBuyer(buyerAddress, { from: account });
        })
        .then(function (result, err) {
          if (result) {
            if (parseInt(result.receipt.status) == 1)
              alert(buyerAddress + " " + "unregistration done successfully");
            else
              alert(
                buyerAddress +
                  "unregistration not done successfully due to revert"
              );
          } else {
            alert(buyerAddress + "unregistration failed");
          }
        });
    });
  },

  buyCar1: function (sellerAddress) {
    var instance3;
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];
      App.contracts.car
        .deployed()
        .then(function (instance) {
          instance3 = instance;
          console.log("test ",sellerAddress);
          //return instance3.buy(buyerAddress, 1,{from:account});
          return instance3.buy(sellerAddress, 4500 * 1000000000000000000 , {from:account})
        })
        .then(function (result, err) {
          alert(sellerAddress + " bought successfully");
        });
    });
  },
  buyCar2: function (sellerAddress) {
    var instance3;
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];
      App.contracts.car
        .deployed()
        .then(function (instance) {
          instance3 = instance;
          console.log("test ",sellerAddress);
          //return instance3.buy(buyerAddress, 1,{from:account});
          return instance3.buy(sellerAddress, 16000 * 1000000000000000000, {from:account})
        })
        .then(function (result, err) {
          alert(sellerAddress + " bought successfully");
        });
    });
  },
  buyCar3: function (sellerAddress) {
    var instance3;
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];
      App.contracts.car
        .deployed()
        .then(function (instance) {
          instance3 = instance;
          console.log("test ",sellerAddress);
          //return instance3.buy(buyerAddress, 1,{from:account});
          return instance3.buy(sellerAddress, 23000, {from:account})
        })
        .then(function (result, err) {
          alert(sellerAddress + " bought successfully");
        });
    });
  },
  buyCar4: function (sellerAddress) {
    var instance3;
    web3.eth.getAccounts(function (error, accounts) {
      var account = accounts[0];
      App.contracts.car
        .deployed()
        .then(function (instance) {
          instance3 = instance;
          console.log("test ",sellerAddress);
          //return instance3.buy(buyerAddress, 1,{from:account});
          return instance3.buy(sellerAddress, 64000, {from:account})
        })
        .then(function (result, err) {
          alert(sellerAddress + " bought successfully");
        });
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
