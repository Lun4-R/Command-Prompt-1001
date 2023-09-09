addLayer("ach", {
    name: "INF-A", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "INF-A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    row: "side",
    
    achievementNotif() {
      return `Achievement Finished` // little tamper in utils.js at line 276 :troll:
    },
    achivementPow() {
      let Base = new Decimal(0)
      let Achievement = player.ach.achievements.length
      
      let Calculation = new Decimal.pow(1.005, Achievement)
      Base = Base.add(Calculation)
      
      return Base
    },
    achievements: {
      "TTST1": {
            name: "First of many",
            done() { return player.main.points.gt(1) },
            tooltip: "Produce your first Stellar!",
      },
      "TTST2": {
        name: "Thousand",
        done() { return player.main.points.gt(1000) },
        tooltip: "Produce 1,000 Stellar!",
      },
      "TTST3": {
        name: "Wealthy",
        done() { return player.main.points.gt(1e9) },
        tooltip: "Produce 1,000,000,000 Stellar!",
      },
      "TTST4": {
        name: "Richer than Elon Musk",
        done() { return player.main.points.gt(1e18) },
        tooltip: "Produce 1e18 Stellar!",
      },
      "TTST5": {
        name: "More worth than Earth",
        done() { return player.main.points.gt(1e36) },
        tooltip: "Produce 1e36 Stellar!",
      },
      "TTST6": {
        name: "Funnily Rich",
        done() { return player.main.points.gt(1e144) },
        tooltip: "Produce 1e144 Stellar!",
      },
      "TTST7": {
        name: "Unfunnily Rich",
        done() { return player.main.points.gt("1e576") },
        tooltip: "Produce 1e576 Stellar!",
      },
      "TTST8": {
        name: `<img src="images/gihun.jpeg" width="32" height="32">`,
        done() { return player.main.points.gt("1e2304") },
        tooltip: "Produce 1e2,304 Stellar!",
      },
      "TTST9": {
        name: `More worth than Observable Universe `,
        done() { return player.main.points.gt("1e9216") },
        tooltip: "Produce 1e9,216 Stellar!",
      },
      "TTST10": {
        name: `Richer than MrBeast?`,
        done() { return player.main.points.gt("1e36864") },
        tooltip: "Produce 1e36,864 Stellar!",
      },
      "TTST11": {
        name: `Wow.`,
        done() { return player.main.points.gt("1e147456") },
        tooltip: "Produce 1e147,455 Stellar!",
      },
      
      "TTET1": {
        name: `What's this?`,
        done() { return player.main.eth.gt(1) },
        tooltip: "Manufacture 1 Ethereum!",
      },
      "TTET2": {
        name: `Copy of Stellar`,
        done() { return player.main.eth.gt(1000) },
        tooltip: "Manufacture 1,000 Ethereum!",
      },
      "TTET3": {
        name: `Is this currency even worth of grind?`,
        done() { return player.main.eth.gt(1e12) },
        tooltip: "Manufacture 1e12 Ethereum!",
      },
      "TTET4": {
        name: `Rich again`,
        done() { return player.main.eth.gt(1e48) },
        tooltip: "Manufacture 1e48 Ethereum!",
      },
      "TTET5": {
        name: `Elon would be proud`,
        done() { return player.main.eth.gt(1e192) },
        tooltip: "Manufacture 1e129 Ethereum!",
      },
      "TTET6": {
        name: `I own more than I can count`,
        done() { return player.main.eth.gt("1e384") },
        tooltip: "Manufacture 1e384 Ethereum!",
      },
      "TTET7": {
        name: `The gods are pleased`,
        done() { return player.main.eth.gt("1e768") },
        tooltip: "Manufacture 1e768 Ethereum!",
      },
      "TTET8": {
        name: `They forgot to limit my Ethereum manufacturing`,
        done() { return player.main.eth.gt("1e3072") },
        tooltip: `Manufacture 1e3,072 Ethereum!`,
      },
      "TTET9": {
        name: `Is this real?`,
        done() { return player.main.eth.gt("1e12288") },
        tooltip: `Manufacture 1e12,288 Ethereum!`,
      },
      "TTET10": {
        name: `Lumen is pleased`,
        done() { return player.main.eth.gt("1e49512") },
        tooltip: `Manufacture 1e49,512 Ethereum!`,
      },
      
      "TTBT1": {
        name: `A start of new Era`,
        done() { return player.main.btc.gt("1") },
        tooltip: `Fork your first Bitcoin!`,
      },
      "TTBT2": {
        name: `In this video I gave away 1,000 Bitcoin to a random subscriber`,
        done() { return player.main.btc.gt("1000") },
        tooltip: `Fork 1,000 Bitcoin!`,
      },
      "TTBT3": {
        name: `Satoshi upper limit`,
        done() { return player.main.btc.gt("21000000") },
        tooltip: `Fork 21,000,000 Bitcoin!`,
      },
      "TTBT4": {
        name: `Wealthy^2`,
        done() { return player.main.btc.gt("1e18") },
        tooltip: `Fork 1e18 Bitcoin!`,
      },
      "TTBT5": {
        name: `Wealthy^3`,
        done() { return player.main.btc.gt("1e36") },
        tooltip: `Fork 1e36 Bitcoin!`,
      },
      "TTBT6": {
        name: `Wealthy^4`,
        done() { return player.main.btc.gt("1e72") },
        tooltip: `Fork 1e72 Bitcoin!`,
      },
      "TTBT7": {
        name: `Uncle Satoshi would be proud`,
        done() { return player.main.btc.gt("1e144") },
        tooltip: `Fork 1e144 Bitcoin!`,
      },
      "TTBT8": {
        name: `Where do you even get all of this?`,
        done() { return player.main.btc.gt("1e288") },
        tooltip: `Fork 1e288 Bitcoin!`,
      },
      "TTBT9": {
        name: `<img src="images/gihun2.png" width="32" height="32">`,
        done() { return player.main.btc.gt("1e576") },
        tooltip: `Fork 1e576 Bitcoin!`,
      },
      "TTBT10": {
        name: `And still no major inflation at stock market???`,
        done() { return player.main.btc.gt("1e1052") },
        tooltip: `Fork 1e1052 Bitcoin!`,
      },
      
      "TTT1": {
        name: `All that progress gone...`,
        done() { return player.main.tier.gte("1") },
        tooltip: `Obtain Tier 1!`,
      },
      "TTT2": {
        name: `That was easy`,
        done() { return player.main.tier.gte("2") },
        tooltip: `Obtain Tier 2!`,
      },
      "TTT3": {
        name: `That was even easier!`,
        done() { return player.main.tier.gte("3") },
        tooltip: `Obtain Tier 3!`,
      },
      "TTT4": {
        name: `Is this game actually this easy?`,
        done() { return player.main.tier.gte("5") },
        tooltip: `Obtain Tier 5!`,
      },
      "TTT5": {
        name: `Racking these Tiers`,
        done() { return player.main.tier.gte("10") },
        tooltip: `Obtain Tier 10!`,
      },
      "TTT6": {
        name: `Speedrunning through `,
        done() { return player.main.tier.gte("20") },
        tooltip: `Obtain Tier 20!`,
      },
      "TTT7": {
        name: `A challenge please!`,
        done() { return player.main.tier.gte("40") },
        tooltip: `Obtain Tier 40!`,
      },
      "TTT8": {
        name: `a`,
        done() { return player.main.tier.gte("80") },
        tooltip: `Obtain Tier 80!`,
      },
      "TTT9": {
        name: `Okay I was kidding...`,
        done() { return player.main.tier.gte("160") },
        tooltip: `Obtain Tier 160!`,
      },
      "TTT10": {
        name: `Stopppp.....`,
        done() { return player.main.tier.gte("320") },
        tooltip: `Obtain Tier 320!`,
      },
      
      "TTAC1": {
        name: `Bronze Mastery`,
        done() { return player.ach.achievements.length > 5 },
        tooltip: `Have more than 5 achievements`,
        style() {
          return {
            "background-image": "url('images/MasteryI.png')",
            "background-size": "100% !important"
          }
        },
        unlocked() {
          return player.ach.achievements.length > 5
        }
      },
      "TTAC2": {
        name: `Silver Mastery`,
        done() { return player.ach.achievements.length > 10 },
        tooltip: `Have more than 10 achievements`,
        style() {
          return {
            "background-image": "url('images/MasteryII.png')",
            "background-size": "100% !important"
          }
        },
        unlocked() {
          return player.ach.achievements.length > 10
        }
      },
      "TTAC3": {
        name: `Gold Mastery`,
        done() { return player.ach.achievements.length > 15 },
        tooltip: `Have more than 15 achievements`,
        style() {
          return {
            "background-image": "url('images/MasteryIII.png')",
            "background-size": "100% !important"
          }
        },
        unlocked() {
          return player.ach.achievements.length > 15
        }
      },
      "TTAC4": {
       name: `Diamond Mastery`,
       done() { return player.ach.achievements.length > 20 },
       tooltip: `Have more than 20 achievements`,
       style() {
         return {
           "background-image": "url('images/MasteryIV.png')",
           "background-size": "100% !important"
         }
       },
       unlocked() {
         return player.ach.achievements.length > 20
       }
       },
       "TTAC5": {
        name: `Amethyst Mastery`,
        done() { return player.ach.achievements.length > 30 },
        tooltip: `Have more than 30 achievements`,
        style() {
          return {
            "background-image": "url('images/MasteryV.png')",
            "background-size": "100% !important"
          }
        },
        unlocked() {
          return player.ach.achievements.length > 30
        }
        },
        "TTAC6": {
          name: `Ruby Mastery`,
          done() { return player.ach.achievements.length > 40 },
          tooltip: `Have more than 40 achievements`,
          style() {
            return {
              "background-image" : "url('images/MasteryVI.png')",
              "background-size" : "100% !important"
            }
          },
          unlocked() {
            return player.ach.achievements.length > 40
          }
        },
    },

    tabFormat: [
            "blank",
            ["display-text", function() { return "<MA style='font-size: 25px'>Achievements: " + player.ach.achievements.length + " / " + (Object.keys(tmp.ach.achievements).length - 2) }],
             ["display-text", function() { return `<MA style='font-size: 25px'>Your acheivements raise Point generation by ^${format(tmp.ach.achivementPow)}</MA><br>
             <MA style="font-size: 20px; color: #595959">1.005x for each achievement</MA>` }],
            "blank", "blank",
       ["display-text", function() { return "Stellar Achievements"}],
       ["row", [["achievement", "TTST1"], ["achievement", "TTST2"], ["achievement", "TTST3"], ["achievement", "TTST4"]]],
       ["row", [["achievement", "TTST5"], ["achievement", "TTST6"], ["achievement", "TTST7"], ["achievement", "TTST8"]]],
       ["row", [["achievement", "TTST9"], ["achievement", "TTST10"], ["achievement", "TTST11"]]],
       "blank",
       "blank",
       ["display-text", function() { return "Ethereum Achievements" }],
       ["row", [["achievement", "TTET1"], ["achievement", "TTET2"], ["achievement", "TTET3"], ["achievement", "TTET4"]]],
       ["row", [["achievement", "TTET5"], ["achievement", "TTET6"], ["achievement", "TTET7"], ["achievement", "TTET8"]]],
       ["row", [["achievement", "TTET9"], ["achievement", "TTET10"]]],
       "blank",
       "blank",
        ["display-text", function() { return "Bitcoin Achievements" }],
        ["row", [["achievement", "TTBT1"], ["achievement", "TTBT2"], ["achievement", "TTBT3"], ["achievement", "TTBT4"]]],
        ["row", [["achievement", "TTBT5"], ["achievement", "TTBT6"], ["achievement", "TTBT7"], ["achievement", "TTBT8"]]],
        ["row", [["achievement", "TTBT9"], ["achievement", "TTBT10"]]],
        "blank",
        "blank",
        ["display-text", function() { return "Tier Achievements" }],
        ["row", [["achievement", "TTT1"], ["achievement", "TTT2"], ["achievement", "TTT3"], ["achievement", "TTBT4"]]],
        ["row", [["achievement", "TTT5"], ["achievement", "TTT6"], ["achievement", "TTT7"], ["achievement", "TTT8"]]],
        ["row", [["achievement", "TTT9"], ["achievement", "TTT10"]]],
        "blank",
        "blank",
        ["display-text", function() { return "Mastery Achievements" }],
        ["row", [["achievement", "TTAC1"], ["achievement", "TTAC2"], ["achievement", "TTAC3"], ["achievement", "TTAC4"]]],
        ["row", [["achievement", "TTAC5"], ["achievement", "TTAC6"]]]
  
        ],
    layerShown(){return true}
})
