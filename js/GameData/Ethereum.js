addLayer("ETH", {
    name: "Ethereum", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ETH", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Ethereum", // Name of prestige currency
    baseResource: "Stellar", // Name of resource prestige is based on
    baseAmount() {return player.ST.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    gainEth() {
      let base = new Decimal(1)
      let calc = base.add(buyableEffect("ETH", "T0-ETH-2"))
      calc = calc.mul(hasMilestone("T", "T0-7") ? tmp.T.T9bonus : 1)
      calc = calc.pow(buyableEffect("TK", "TK-AS-ETH"))
      return calc
    },
    ethBoost() {
      let base = player.ETH.points
      let pow = new Decimal(1.25)
      let root = new Decimal(2)
      pow = pow.add(hasMilestone("T", "T0-6") ? 0.14 : 0)
      root = root.sub(hasMilestone("T", "T0-6") ? 0.06 : 0)
      let calc = new Decimal.pow(base, pow).sqrt(root)
      return calc
    },
    update(delta) {
      if (hasMilestone("T", "T0-5")) {
      player.ETH.points = player.ETH.points.add((tmp.ETH.gainEth).times(delta))
      }
    },
buyables: {
    "T0-ETH-1": {
      cost(x) {
        let basepow = new Decimal(1.05)
        let pow1 = new Decimal.div(x, 100).add(1)
        let pow2 = new Decimal.div(x, 100).add(1)
        let pow3 = new Decimal.div(x, 100).add(1)
        basepow = basepow.pow(pow1)
        basepow = basepow.pow(pow2)
        basepow = basepow.pow(pow3)
        let calc = new Decimal.pow(basepow, x).mul(5)
        calc = calc.div(buyableEffect("ETH", "T0-ETH-4"))
        return calc },
      effect(x) {
        let pow = new Decimal(1.33)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      auxDisplay() {
        let Base = new Decimal(4)
        let x = player[this.layer].buyables[this.id]
      
        let Calculation = new Decimal.log(Decimal.pow(1.3, x.add(1)), 1000).pow(0.5, Decimal.mul(Decimal.div(1, x))) // wtf is that formula even lmao
        return Base.mul(Calculation)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>${format(S.auxDisplay)}" Display</b>
       
        <b class='Body-Text-XL'>x${format(S.effect)} ST & Bits</b>
        <b class='Body-Text-S'>${format(S.cost)} Ethereum
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
          "background-image": "url('images/T0-ETH-Can.png')",
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
        "background-image": "url('images/T0-ETH-Cant.png')",
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
    "T0-ETH-2": {
      cost(x) {
        let basepow = new Decimal(2.5)
        let pow1 = new Decimal.div(x, 100).add(1)
        let pow2 = new Decimal.div(x, 100).add(1)
        let pow3 = new Decimal.div(x, 100).add(1)
        basepow = basepow.pow(pow1)
        basepow = basepow.pow(pow2)
        basepow = basepow.pow(pow3)
        let calc = new Decimal.pow(basepow, x).mul(75)
        calc = calc.div(buyableEffect("ETH", "T0-ETH-4"))
        return calc },
      effect(x) {
        let pow = new Decimal(3)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      auxDisplay() {
        let Base = new Decimal(4)
        let x = player[this.layer].buyables[this.id]
      
        let Calculation = new Decimal.pow(1.25, x).pow(0.5).floor()
        return Base.mul(Calculation)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>${format(S.auxDisplay)} Colors</b>
       
        <b class='Body-Text-XL'>x${format(S.effect)} Ethereum</b>
        <b class='Body-Text-S'>${format(S.cost)} Ethereum
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
          "background-image": "url('images/T0-ETH-Can.png')",
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
        "background-image": "url('images/T0-ETH-Cant.png')",
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
    "T0-ETH-3": {
      cost(x) {
        let basepow = new Decimal(2)
        let pow1 = new Decimal.div(x, 100).add(1)
        let pow2 = new Decimal.div(x, 100).add(1)
        let pow3 = new Decimal.div(x, 100).add(1)
        basepow = basepow.pow(pow1)
        basepow = basepow.pow(pow2)
        basepow = basepow.pow(pow3)
        let calc = new Decimal.pow(basepow, x).mul(5000)
        calc = calc.div(buyableEffect("ETH", "T0-ETH-4"))
        return calc },
      effect(x) {
        let pow = new Decimal(1.25)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      auxDisplay() {
        let Base = new Decimal(1)
        let x = player[this.layer].buyables[this.id]
      
        let Calculation = new Decimal.mul(1, x).div(10)
        return Base.add(Calculation)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>NikOS ${format(S.auxDisplay)} </b>
       
        <b class='Body-Text-XL'>x${format(S.effect)} Bit Machines base</b>
        <b class='Body-Text-S'>${format(S.cost)} Ethereum
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
          "background-image": "url('images/T0-ETH-Can.png')",
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
        "background-image": "url('images/T0-ETH-Cant.png')",
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
        return hasMilestone("T", "T0-6")
      }
    },
    "T0-ETH-4": {
      cost(x) {
        let basepow = new Decimal(25)
        let pow1 = new Decimal.div(x, 100).add(1)
        let pow2 = new Decimal.div(x, 100).add(1)
        let pow3 = new Decimal.div(x, 100).add(1)
        basepow = basepow.pow(pow1)
        basepow = basepow.pow(pow2)
        basepow = basepow.pow(pow3)
        let calc = new Decimal.pow(basepow, x).mul(1e12)
        return calc },
      effect(x) {
        let pow = new Decimal(10)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      auxDisplay() {
        let Base = new Decimal(100)
        let x = player[this.layer].buyables[this.id]
      
        let Calculation = new Decimal.mul(10, x).mul(1)
        return Base.add(Calculation)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>TaDe Basic ${format(S.auxDisplay)} </b>
       
        <b class='Body-Text-XL'>/${format(S.effect)} Previous Components cost</b>
        <b class='Body-Text-S'>${format(S.cost)} Ethereum
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
          "background-image": "url('images/T0-ETH-Can.png')",
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
        "background-image": "url('images/T0-ETH-Cant.png')",
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
        return hasMilestone("T", "T0-7")
      }
    },
},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("T", "T0-5")},
    tabFormat: {
     "Main": {
            content: [
              "h-line",
              "blank",
              ['raw-html', () => {
                return `<b class='Main-Text'>You have <b class='Currency-Text'>${format(player.ETH.points)}</b> Ethereum</b>`
              }],
              ['raw-html', () => {
                return `<b class='Main-Sub-Text'>You are cooling <b class='Currency-Sub-Text'>${format(tmp.ETH.gainEth)}</b> ETH / sec</b>`
              }],
              "blank",
              ['raw-html', () => {
                return `<b class='Main-Sub-Text'>Your ETH is also boosting ST & Bits by <b class='Currency-Sub-Text'>${format(tmp.ETH.ethBoost)}</b>x</b>`
              }],
              "blank",
              "h-line",
              "blank",
              ["row", [["buyable", "T0-ETH-1"]]],
              ["row", [["buyable", "T0-ETH-2"]]],
              ["row", [["buyable", "T0-ETH-3"]]],
              ["row", [["buyable", "T0-ETH-4"]]],],
          },
        }
})
