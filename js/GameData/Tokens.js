addLayer("TK", {
  name: "Tokens", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol() {
    return `<img src='images/layers/Token_512x.png' height='60' width='60'>`
  }, // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      tokens: new Decimal(0),
    }
  },
  color: "#f58f0a",
  glowColor: "#f58f0a",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() { return player.points }, // Get the current amount of baseResource
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
    const milestones = ["T0-5", "T0-6", "T0-7", "T0-10", "T0-12", "T0-14",];
    for (const milestone of milestones) {
      if (hasMilestone("T", milestone)) {
        base = base.mul(2);
      }
    }
    base = base.div(60)
    return base
  },
  update(delta) {
    player.TK.tokens = player.TK.tokens.add((tmp.TK.tokenGain.times(delta)))
  },
  buyables: {
    "TK-AS-Bits": {
      cost(x) {
        let pow = new Decimal(10)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      effect(x) {
        let pow = new Decimal(1.1)
        return new Decimal.pow(pow, x)
      },
      purchaseLimit() {
        return new Decimal(9)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>Extra Bits</b>
       
        <b class='Body-Text-XL'>^${format(S.effect)} Bits</b>
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
        const buyable = tmp[this.layer].buyables[this.id];
        var am = player[this.layer].buyables[this.id]
        const backgroundImage = buyable.canAfford ?
          `url('images/levels/TK-AS-L${am}.png')` :
          `url('images/levels/TK-AS-Cant.png')`;

        return {
          "background-image": backgroundImage,
          "background-size": "110% !important",
          "width": "430px",
          "height": "auto",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 5px #000000",
          "color": "#ffffff"
        };
      }
    },
    "TK-AS-ST": {
      cost(x) {
        let pow = new Decimal(10)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      effect(x) {
        let pow = new Decimal(1.06)
        return new Decimal.pow(pow, x)
      },
      purchaseLimit() {
        return new Decimal(9)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>Extra Stellar</b>
       
        <b class='Body-Text-XL'>^${format(S.effect)} Stellar</b>
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
        const buyable = tmp[this.layer].buyables[this.id];
        var am = player[this.layer].buyables[this.id]
        const backgroundImage = buyable.canAfford ?
          `url('images/levels/TK-AS-L${am}.png')` :
          `url('images/levels/TK-AS-Cant.png')`;

        return {
          "background-image": backgroundImage,
          "background-size": "110% !important",
          "width": "430px",
          "height": "auto",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 5px #000000",
          "color": "#ffffff"
        };
      }
    },
    "TK-AS-ETH": {
      cost(x) {
        let pow = new Decimal(10)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      effect(x) {
        let pow = new Decimal(1.05)
        return new Decimal.pow(pow, x)
      },
      purchaseLimit() {
        return new Decimal(9)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
        <div class='Buyable-Style'>
        <b class='Body-Text-L'>${format(SV, 0)}</b>
        <b class='Title-Text-M'>Extra Ethereum</b>
       
        <b class='Body-Text-XL'>^${format(S.effect)} Ethereum</b>
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
        const buyable = tmp[this.layer].buyables[this.id];
        var am = player[this.layer].buyables[this.id]
        const backgroundImage = buyable.canAfford ?
          `url('images/levels/TK-AS-L${am}.png')` :
          `url('images/levels/TK-AS-Cant.png')`;

        return {
          "background-image": backgroundImage,
          "background-size": "110% !important",
          "width": "430px",
          "height": "auto",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 5px #000000",
          "color": "#ffffff"
        };
      },
      unlocked() {
        return hasMilestone("T", "T0-5")
      }
    },
  },
  tabFormat: {
    "Main": {
      content: [
              ['raw-html', () => {
          return `<b class='Main-Text'>Oh hello player! I am Niko, the shopkeeper of this place.<br>
                I sell various things, but they don't cost your everyday money.<br>
                You get them at snail speed but don't worry, they are worth their price =)<br>
                Visit this place often, as I do sell new stuff ever so often.<br>
                Oh also don't worry losing anything you have bought here.<br>
                As my loyal customer, I'll make sure your hard earned purchases are kept very safe here with me!</b>`
              }],
              "blank",
              "blank",
              "blank",
              "blank",
              ['raw-html', () => {
          return `<b class='Main-Text'>You have <b class='Currency-Text-TK'>${format(player.TK.tokens)}</b> Tokens</b>`
              }],
              ['raw-html', () => {
          return `<b class='Main-Sub-Text'>You generate <b class='Currency-Sub-Text-TK'>${format(tmp.TK.tokenGain.mul(60))}</b> TK / min</b>`
              }],
              "blank",
              "h-line",
              "blank",
              ["row", [["buyable", "TK-AS-Bits"]]],
              ["row", [["buyable", "TK-AS-ST"]]],
              ["row", [["buyable", "TK-AS-ETH"]]]
              ]
    },
    "Permament Upgrades": {
      content: [
              ['raw-html', () => {
          return `<b class='Main-Text'>Here you can buy QoL upgrades that are permament!<br>
            There are many assortments of them so buy those what catches your eye!<br>
            Since they are special most of them have hard limit of amount you can buy them, Bronze indicating most basic
            and Rainbow most advanced and strongest!</b>`
              }],
              "blank",
              "blank",
              "blank",
              "blank",
              ]
    },
  },
  layerShown() { return true }
})