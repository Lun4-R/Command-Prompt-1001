addLayer("ST", {
    name: "Stellar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {
      return `<img src='images/layers/Stellar_512x.png' height='100' width='100'>`
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stellar", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.mul(buyableEffect("ST", "T0-ST-2"))
        mult = mult.mul(buyableEffect("TK", "T0-TK-2"))
        mult = mult.mul(hasMilestone("T", "T0-3") ? tmp.T.T3bonus : 1)
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
    buyables: {
    "T0-ST-1": {
      cost(x) {
        let basepow = new Decimal(1.25)
        basepow = basepow.div(hasMilestone("T", "T0-3") ? 1.1 : 1)
        let pow1 = new Decimal.div(x, 100).add(1)
        let pow2 = new Decimal.div(x, 100).add(1)
        let pow3 = new Decimal.div(x, 100).add(1)
        basepow = basepow.pow(pow1)
        basepow = basepow.pow(pow2)
        basepow = basepow.pow(pow3)
        let calc = new Decimal.pow(basepow, x).mul(5)
        calc = calc.div(buyableEffect("ST", "T0-ST-4"))
        return calc },
      effect(x) {
        let pow = new Decimal(1)
        let bonus = x.div(7).add(1)
        pow = pow.mul(hasMilestone("T", "T0-4") ? bonus : 1)
        pow = pow.add(buyableEffect("ST", "T0-ST-3"))
        return new Decimal.mul(pow, x)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>Bit Machines</b>
       
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
        let basepow = new Decimal(1.15)
        basepow = basepow.div(hasMilestone("T", "T0-3") ? 1.1 : 1)
        let pow1 = new Decimal.div(x, 100).add(1)
        let pow2 = new Decimal.div(x, 100).add(1)
        let pow3 = new Decimal.div(x, 100).add(1)
        basepow = basepow.pow(pow1)
        basepow = basepow.pow(pow2)
        basepow = basepow.pow(pow3)
        let calc = new Decimal.pow(basepow, x).mul(25)
        calc = calc.div(buyableEffect("ST", "T0-ST-4"))
        return calc},
      effect(x) {
        let pow = new Decimal(1.125)
        return new Decimal.pow(pow, x)
      },
      auxDisplay() {
        let Base = new Decimal(131072)
        let x = player[this.layer].buyables[this.id]
        
        let Calculation = new Decimal.pow(1.055, x.add(1))
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
      }
    },
    "T0-ST-3": {
      cost(x) {
        let basepow = new Decimal(2)
        let pow1 = new Decimal.div(x, 100).add(1)
        let pow2 = new Decimal.div(x, 100).add(1)
        let pow3 = new Decimal.div(x, 100).add(1)
        basepow = basepow.pow(pow1)
        basepow = basepow.pow(pow2)
        basepow = basepow.pow(pow3)
        let calc = new Decimal.pow(basepow, x).mul(500)
        calc = calc.div(buyableEffect("ST", "T0-ST-4"))
        return calc},
      effect(x) {
        let pow = new Decimal(1)
        return new Decimal.mul(pow, x)
      },
      auxDisplay() {
        let Base = new Decimal(25000)
        let x = player[this.layer].buyables[this.id]
        
        let Calculation = new Decimal.pow(1.055, x.add(1))
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
        return hasMilestone("T", "T0-1")
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
        let basepow = new Decimal(1.1)
        let pow1 = new Decimal.div(x, 100).add(1)
        let pow2 = new Decimal.div(x, 100).add(1)
        let pow3 = new Decimal.div(x, 100).add(1)
        basepow = basepow.pow(pow1)
        basepow = basepow.pow(pow2)
        basepow = basepow.pow(pow3)
        return Decimal.pow(basepow, x).mul(25).floor() },
      effect(x) {
        let pow = new Decimal(1.5)
        return new Decimal.pow(pow, x)
      },
      auxDisplay() {
        let Base = new Decimal(12800)
        let x = player[this.layer].buyables[this.id]
        
        let Calculation = new Decimal.pow(1.5, x.add(1))
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
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return tmp[this.layer].T0STbuyableCalc.gte(this.cost())
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
    },
    layerShown(){return true},
    tabFormat: {
        "Main Progression": {
          content: [
          "h-line",
          "blank",
          ['raw-html', () => {
          return `<b class='Main-Text'>You have <b class='Currency-Text'>${format(player.ST.points)}</b> Stellar</b>`
          }],
          ['raw-html', () => {
            return `<b class='Main-Sub-Text'>You generate <b class='Currency-Sub-Text'>${format(tmp.ST.resetGain)}</b> ST / sec</b>`
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
