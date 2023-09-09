addLayer("TK", {
    name: "Tokens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {
      return `<img src='images/layers/Token_512x.png' height='60' width='60'>`
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		tokens: new Decimal(0),
    }},
    color: "#f58f0a",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tokenGain() {
      let base = new Decimal(1)
      base = base.div(60)
      return base
    },
    update(delta) {
      player.TK.tokens = player.TK.tokens.add((tmp.TK.tokenGain.times(delta)))
    },
    buyables: {
    "T0-TK-1": {
      cost(x) {
        let basepow = new Decimal(1)
        let bonus = x.div(10).add(1).floor()
        basepow = basepow.mul(bonus)
        let calc = new Decimal.add(basepow)
        return calc },
      effect(x) {
        let pow = new Decimal(1)
        pow = pow.add(x.div(10).add(1).floor())
        return new Decimal.mul(pow, x).add(1)
        },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>Extra Bits</b>
       
        <b class='Body-Text-XL'>x${format(S.effect)} Bits</b>
        <b class='Body-Text-S'>${format(S.cost)} Tokens</b>
        <br>
        </div>`
      },
      buy() {
        player[this.layer].tokens = player[this.layer].tokens.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].tokens.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
        return {
          "background-image": "url('images/T0-TK-Can.png')",
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
        "background-image": "url('images/T0-TK-Cant.png')",
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
    "T0-TK-2": {
      cost(x) {
        let basepow = new Decimal(1)
        let bonus = x.div(10).add(1).floor()
        basepow = basepow.mul(bonus)
        let calc = new Decimal.add(basepow)
        return calc },
      effect(x) {
        let pow = new Decimal(1)
        pow = pow.add(x.div(10).add(1).floor())
        return new Decimal.mul(pow, x).add(1)
        },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>Extra Stellar</b>
       
        <b class='Body-Text-XL'>x${format(S.effect)} Stellar</b>
        <b class='Body-Text-S'>${format(S.cost)} Tokens</b>
        <br>
        </div>`
      },
      buy() {
        player[this.layer].tokens = player[this.layer].tokens.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].tokens.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
        return {
          "background-image": "url('images/T0-TK-Can.png')",
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
        "background-image": "url('images/T0-TK-Cant.png')",
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
    tabFormat: {
      "Main": {
        content: [
              ['raw-html', () => {
            return `<b class='Main-Text'>You have <b class='Currency-Text-TK'>${format(player.TK.tokens)}</b> Tokens</b>`
              }],
              ['raw-html', () => {
            return `<b class='Main-Sub-Text'>You generate <b class='Currency-Sub-Text-TK'>${format(tmp.TK.tokenGain.mul(60))}</b> TK / min</b>`
              }],
              "blank",
              "h-line",
              "blank",
              ["row", [["buyable", "T0-TK-1"]]],
              ["row", [["buyable", "T0-TK-2"]]]
              ]
      },
    },
    layerShown(){return true}
})
