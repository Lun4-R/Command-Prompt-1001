/*
TM4, TM6 , TM8 , TM10, TM14, TM18, TM22, TM26
TM5, TM7 , TM9 , TM11, TM15, TM19, TM23, TM27
TM6, TM8 , TM10, TM12, TM16, TM20, TM24, TM28
TM7, TM9 , TM11, TM13, TM17, TM21, TM25, TM29
*/

addLayer("ST", {
  name: "Stellar", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol() {
    return `ST`
  }, // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
    }
  },
  color: "#ffffff",
  extraColor: "#333333",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Stellar", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() { return player.points }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1)
    mult = mult.mul(buyableEffect("ST", "T0-ST-2"))
    mult = mult.mul(buyableEffect("ETH", "T0-ETH-1"))
    mult = mult.mul(hasMilestone("T", "T0-3") ? tmp.T.T3bonus1 : 1)
    mult = mult.mul(hasMilestone("T", "T0-8") ? tmp.T.T3bonus2 : 1)
    mult = mult.mul(hasMilestone("T", "T0-5") ? tmp.ETH.ethBoost : 1)
    mult = mult.pow(buyableEffect("TK", "TK-AS-ST"))
    return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    return new Decimal(1)
  },
  passiveGeneration() {
    return new Decimal(1)
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  T0STbuyableCalc() {
    let count = new Decimal(0)
    count = count.add(player[this.layer].buyables["T0-ST-1"])
    count = count.add(player[this.layer].buyables["T0-ST-2"])
    count = count.add(player[this.layer].buyables["T0-ST-3"])
    return count
  },
  STMagnitude() {
    let base = player.ST.points
    let log = new Decimal(10)
    let calc = new Decimal.log(base.add(1), log)
    return calc
  },
  STMagnitudeBoost() {
    let base = player.ST.points
    let log = new Decimal(10)
    log = log.sub(hasMilestone("T", "T0-12") ? 5 : 0)
    let calc = new Decimal.log(base.add(1), log)
    calc = calc.pow(2)
    return calc
  },
  buyables: {
    "T0-ST-1": {
      cost(x) {
        let basepow = new Decimal(1.75);
        const milestones = ["T0-30"];
        let tripow = new Decimal.div(x, 100).add(1).pow(3)
        for (const milestone of milestones) {
          if (hasMilestone("T", milestone)) {
            basepow = basepow.sub(0.05);
          }
        }
        basepow = basepow.pow(tripow)
        let calc = new Decimal.pow(basepow, x).mul(5);
        calc = calc.div(buyableEffect("ST", "T0-ST-4"));
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1)
        pow = pow.add(buyableEffect("ST", "T0-ST-3"))
        const tierMilestonesI = ["T0-4", "T0-6", "T0-8", "T0-10"];
        const tierMilestonesII = ["T0-14", "T0-18", "T0-22", "T0-26"];
        let calc = new Decimal.mul(pow, x)
        for (const milestone of tierMilestonesI) {
          if (hasMilestone("T", tierMilestonesI)) {
            calc = calc.pow(1.5);
          }
        }
        for (const milestone of tierMilestonesII) {
          if (hasMilestone("T", tierMilestonesII)) {
            calc = calc.pow(1.25);
          }
        }
        return calc
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        let type = `Bit`
        if (hasMilestone("T", "T0-5")) type = `Byte`
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>${type} Machines</b>
       
        <b class='Body-Text-XL'>+${format(S.effect)} Bits / sec</b>
        <b class='Body-Text-S'>${format(S.cost)} Stellar</b>
        <br>
        </div>`
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/T0-ST-Can.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "auto",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/T0-ST-Cant.png')",
          "background-size": "110% !important",
          "width": "430px",
          "height": "auto",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      }
    },
    "T0-ST-2": {
      cost(x) {
        let basepow = new Decimal(1.5);
        const milestones = ["T0-30"];
        let tripow = new Decimal.div(x, 100).add(1).pow(3)
        for (const milestone of milestones) {
          if (hasMilestone("T", milestone)) {
            basepow = basepow.sub(0.05);
          }
        }
        basepow = basepow.pow(tripow)
        let calc = new Decimal.pow(basepow, x).mul(5);
        calc = calc.div(buyableEffect("ST", "T0-ST-4"));
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1.25)
        const tierMilestonesI = ["T0-5", "T0-7", "T0-9", "T0-11"];
        const tierMilestonesII = ["T0-15", "T0-19", "T0-23", "T0-27"];
        let calc = new Decimal.pow(pow, x)
        for (const milestone of tierMilestonesI) {
          if (hasMilestone("T", tierMilestonesI)) {
            calc = calc.pow(1.33);
          }
        }
        for (const milestone of tierMilestonesII) {
          if (hasMilestone("T", tierMilestonesII)) {
            calc = calc.pow(1.15);
          }
        }
        return calc
      },
      auxDisplay() {
        let Base = new Decimal(131072)
        let x = player[this.layer].buyables[this.id]

        let Calculation = new Decimal.pow(1.005, x.add(1))
        return Base.mul(Calculation).floor()
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>${FDS(S.auxDisplay)} RAM</b>
       
        <b class='Body-Text-XL'>x${format(S.effect)} ST / sec</b>
        <b class='Body-Text-S'>${format(S.cost)} Stellar</b>
        <br>
        </div>`
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/T0-ST-Can.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "auto",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/T0-ST-Cant.png')",
          "background-size": "110% !important",
          "width": "430px",
          "height": "auto",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return hasMilestone("T", "T0-1")
      }
    },
    "T0-ST-3": {
      cost(x) {
        let basepow = new Decimal(2);
        const milestones = ["T0-30"];
        let tripow = new Decimal.div(x, 100).add(1).pow(3)
        for (const milestone of milestones) {
          if (hasMilestone("T", milestone)) {
            basepow = basepow.sub(0.05);
          }
        }
        basepow = basepow.pow(tripow)
        let calc = new Decimal.pow(basepow, x).mul(5);
        calc = calc.div(buyableEffect("ST", "T0-ST-4"));
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1.5)
        const tierMilestonesI = ["T0-6", "T0-8", "T0-10", "T0-12"];
        const tierMilestonesII = ["T0-16", "T0-20", "T0-24", "T0-28"];
        let calc = new Decimal.pow(pow, x)
        for (const milestone of tierMilestonesI) {
          if (hasMilestone("T", tierMilestonesI)) {
            calc = calc.pow(1.75);
          }
        }
        for (const milestone of tierMilestonesII) {
          if (hasMilestone("T", tierMilestonesII)) {
            calc = calc.pow(1.25);
          }
        }
        return calc
      },
      auxDisplay() {
        let Base = new Decimal(25000)
        let x = player[this.layer].buyables[this.id]

        let Calculation = new Decimal.pow(1.005, x.add(1))
        return Base.mul(Calculation).floor()
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>${FCS(S.auxDisplay)} CPU</b>
       
        <b class='Body-Text-XL'>+${format(S.effect)} Bit Machines base</b>
        <b class='Body-Text-S'>${format(S.cost)} Stellar</b>
        <br>
        </div>`
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      unlocked() {
        return hasMilestone("T", "T0-2")
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/T0-ST-Can.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "auto",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/T0-ST-Cant.png')",
          "background-size": "110% !important",
          "width": "430px",
          "height": "auto",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      }
    },
    "T0-ST-4": {
      cost(x) {
        let basepow = new Decimal(1.025);
        const milestones = ["T0-30"];
        let tripow = new Decimal.div(x, 100).add(1).pow(1.5)
        for (const milestone of milestones) {
          if (hasMilestone("T", milestone)) {
            basepow = basepow.sub(0.05);
          }
        }
        basepow = basepow.pow(tripow)
        let calc = new Decimal.pow(basepow, x).mul(25).floor();
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1.25)
        const milestones = ["T0-4", "T0-6", "T0-8", "T0-10"];
        let tripow = new Decimal.div(x, 100).add(1).pow(1.33)
        pow = pow.pow(tripow)
        let calc = new Decimal.pow(pow, x)
        for (const milestone of milestones) {
          if (hasMilestone("T", milestone)) {
            calc = calc.pow(1.5);
          }
        }
        return calc
      },
      auxDisplay() {
        let Base = new Decimal(12800)
        let x = player[this.layer].buyables[this.id]

        let Calculation = new Decimal.pow(1.005, x.add(1))
        return Base.mul(Calculation).floor()
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>${FDS(S.auxDisplay)} HDD</b>
       
        <b class='Body-Text-XL'>/${format(S.effect)} Previous Components cost</b>
        <b class='Body-Text-S'>${format(S.cost)} total T0 ST buyables bought</b>
        <br>
        </div>`
      },
      buy() {
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
      },
      canAfford() {
        return tmp[this.layer].T0STbuyableCalc.gte(this.cost())
      },
      unlocked() {
        return hasMilestone("T", "T0-3")
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/T0-ST-Can.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "auto",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/T0-ST-Cant.png')",
          "background-size": "110% !important",
          "width": "430px",
          "height": "auto",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      }
    },
  },
  layerShown() { return hasMilestone("T", "T0-0") },
  tabFormat: {
    "Main Progression": {
      content: [
          "h-line",
          "blank",
          ['raw-html', () => {
            if (hasMilestone("T", "T0-10")) {
          return `<button onclick='showCustomDialog()' class='alt-tabButton'>Tutorial of ST Magnitude</button>
            
          <div id="customDialog" class="custom-dialog">
          <span class='Title-Text-L'>Congrats on heavy breakthrough!</span>
          <br>
          <br>
          <span class='Body-Text-M'>You have passed one major stage of the game but before I hype you up, it is just going get more harder at here...</span>
          <br>
          <br>
          <span class='Body-Text-XS'>However I have given you ST Magnitude, which is based on ST but as boost it gives more Bits! It's effect can be upgraded later ingame!</span>
          <br>
          <span class='Body-Text-XS'><span>
          <br>
          <br>
          <span class='Body-Text-XS'><span style='text-shadow: 0px 0px 10px #ffffff'>ADVANCED INFO</span>: There are 3 more unlocks like ST Magnitude but they aren't same like this one. Instead they get more complex as you progress the game...<span>
          <br>
          <br>
          <button onclick="closeCustomDialog()" class='alt-tabButton'>Close</button>
          </div>`
            }
            else return ``
          }],
          ['raw-html', () => {
            if (hasMilestone("T", "T0-0")) {
            return `<button onclick='showCustomDialog()' class='alt-tabButton'>Tutorial of ST layer</button>
            
          <div id="customDialog" class="custom-dialog">
          <span class='Title-Text-L'>Welcome to The Stellar Lumen : Rebooted!</span>
          <br>
          <br>
          <span class='Body-Text-M'>This is a game revolving around multiple layers , currencies and large numbers!
          <br>To get you started with this game alllow me to introduce few things.</span>
          <br>
          <br>
          <span class='Body-Text-XS'>First you will have 2 layers unlocked at start. You most likely clicked on this first and this is where your main progression will be. For at least EEG period...</span>
          <br>
          <span class='Body-Text-XS'>Stellar is gained through Bits as base and to increase your Stellar production, there are many many ways todo so. But as starters you can gain more Stellar easily through those 2 buyables in front of you!<span>
          <br>
          <br>
          <span class='Body-Text-XS'><span style='text-shadow: 0px 0px 10px #ffffff'>ADVANCED INFO</span>: Buyables have Tiers which is unlocked at Bitcoin Era or ELG period. Buyable Tiers vary from layer to layer but they most likely stay as same with better boost but bigger scale.<span>
          <br>
          <br>
          <button onclick="closeCustomDialog()" class='alt-tabButton'>Close</button>
          </div>`
            }
            else return ``
          }],
          "blank",
          "blank",
          ['raw-html', () => {
          return `<b class='Main-Text'>You have <b class='Currency-Text'>${format(player.ST.points)}</b> Stellar</b>`
          }],
          ['raw-html', () => {
          return `<b class='Main-Sub-Text'>You generate <b class='Currency-Sub-Text'>${format(tmp.ST.resetGain)}</b> ST / sec</b>`
          }],
          ['raw-html', () => {
            if (hasMilestone("T", "T0-10")) {
            return `<b class='Main-Sub-Text'>Your ST Magnitude is <b class='Currency-Sub-Text'>${format(tmp.ST.STMagnitude)}</b> which in return gives <b class='Currency-Sub-Text'>${format(tmp.ST.STMagnitudeBoost)}</b>x Bits</b>`
            }
            else return ``
          }],
          "blank",
          "h-line",
          ["row", [["buyable", "T0-ST-1"]]],
          ["row", [["buyable", "T0-ST-2"]]],
          ["row", [["buyable", "T0-ST-3"]]],
          ["row", [["buyable", "T0-ST-4"]]]
          ],
    },
  }
})