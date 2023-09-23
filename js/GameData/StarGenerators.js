addLayer("SG", {
  symbol: "★", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      sgBits: new Decimal(0),
      sgBitsSac: new Decimal(0),
      sgBitsSacA: new Decimal(0),
      sgStellar: new Decimal(0),
      sgStellarGen: new Decimal(0),
      sgEthereum: new Decimal(0),
      sgToken: new Decimal(0),
    }
  },
  color: "#4BDC13",
  row: 101, // Row the layer is in on the tree (0 is the first row)
  sgiCalc() {
    let base = new Decimal(1)
    base = base.mul(buyableEffect("SG", "SG-Bi-UP1"))
    base = base.mul(buyableEffect("SG", "SG-Bi-UP2"))
    base = base.mul(buyableEffect("SG", "SG-Bi-UP3"))
    base = base.mul(tmp.SG.sgiSacBoost)
    return base
  },
  sgiBoost1() {
    let base = player.SG.sgBits
    let log = new Decimal(10)
    let calc = new Decimal.pow(base, 3)
    return calc
  },
  sgiSacBoost() {
    let base = player.SG.sgBitsSac
    let pow = new Decimal(1.2)
    return new Decimal.pow(base, pow).add(1)
  },
  sgiSacrificeReq() {
    let base = new Decimal(2.5);
    let factor = new Decimal(1.2);
    let iterations = player.SG.sgBitsSacA
    let calc = doubleGeometric(base, factor, iterations).add(15)
    return calc.floor()
  },
  sgiSacrificeReqCalc() {
    let calc = new Decimal(1)
    calc = calc.add(player[this.layer].buyables["SG-Bi-CU1"])
    calc = calc.add(player[this.layer].buyables["SG-Bi-UP1"])
    calc = calc.add(player[this.layer].buyables["SG-Bi-UP2"])
    calc = calc.add(player[this.layer].buyables["SG-Bi-UP3"])
    calc = calc.add(player[this.layer].buyables["SG-Bi-UP4"])
    return calc
  },
  sgiSacrificeCalc() {
    let base = new Decimal(1)
    return base
  },
  sgiSacrifice() {
    player.SG.sgBitsSac = player.SG.sgBitsSac.add(tmp.SG.sgiSacrificeCalc)
    player.SG.sgBitsSacA = player.SG.sgBitsSacA.add(1)

    player[this.layer].buyables["SG-Bi-CU1"] = new Decimal(0);
    player[this.layer].buyables["SG-Bi-UP4"] = new Decimal(0);
    player[this.layer].buyables["SG-Bi-UP3"] = new Decimal(0);
    player[this.layer].buyables["SG-Bi-UP2"] = new Decimal(0);
    player[this.layer].buyables["SG-Bi-UP1"] = new Decimal(0);
    player.SG.sgBits = new Decimal(0);
  },
  reset() {
    player.SG.sgBitsSacA = new Decimal(1)
    player.SG.sgBitsSac = new Decimal(0)
    player[this.layer].buyables["SG-Bi-CU1"] = new Decimal(0);
    player[this.layer].buyables["SG-Bi-UP4"] = new Decimal(0);
    player[this.layer].buyables["SG-Bi-UP3"] = new Decimal(0);
    player[this.layer].buyables["SG-Bi-UP2"] = new Decimal(0);
    player[this.layer].buyables["SG-Bi-UP1"] = new Decimal(0);
    player.SG.sgBits = new Decimal(0);
  },
  update(delta) {
    if (hasMilestone("T", "T0-12")) {
      player.SG.sgBits = player.SG.sgBits.add((tmp.SG.sgiCalc).times(delta))
    }
  },
  clickables: {
    "doSGiSac": {
      display() {
        return `<b class="Body-Text-M">Sacrifice this SG for ${format(tmp.SG.sgiSacrificeCalc)} ★ Essence</b>`
      },
      onClick() {
        tmp.SG.sgiSacrifice()
        showToast("★ Star Generator resetted...", "toast-success")
      },
      canClick() {
        return tmp.SG.sgiSacrificeReqCalc.gte(tmp.SG.sgiSacrificeReq)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "background": "url('images/SGiSac-Can.png')",
            "background-size": "100% !important",
            "width": "auto",
            "height": "50px",
            "border": "0px",
            "border-radius": "5px",
            "margin": "20px",
            "color": "#ffffff"
          }
        return {
          "background": "url('images/SGiSac-Cant.png')",
          "background-size": "100% !important",
          "width": "auto",
          "height": "50px",
          "border": "0px",
          "border-radius": "5px",
          "margin": "20px"
        }
      },
      unlocked() {
        return tmp.SG.sgiSacrificeReqCalc.gte(tmp.SG.sgiSacrificeReq)
      }
    },
    "resetdebugging": {
      display() {
        return `<b class="Body-Text-M">HARD RESET THIS SG</b>`
      },
      onClick() {
        tmp.SG.reset()
        showToast("★ Star Generator resetted...", "toast-warning")
      },
      canClick() {
        return true
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "background": "url('images/SGiSac-Can.png')",
            "background-size": "100% !important",
            "width": "auto",
            "height": "50px",
            "border": "0px",
            "border-radius": "5px",
            "margin": "20px",
            "color": "#ffffff"
          }
        return {
          "background": "url('images/SGiSac-Cant.png')",
          "background-size": "100% !important",
          "width": "auto",
          "height": "50px",
          "border": "0px",
          "border-radius": "5px",
          "margin": "20px"
        }
      },
      unlocked() {
        return true
      }
    }
  },
  buyables: {
    "SG-Bi-UP1": {
      cost(x) {
        let base = new Decimal(2);
        let factor = new Decimal(1);
        let iterations = x;
        let calc = exponential(base, factor, iterations)
        calc = calc.div(buyableEffect("SG", "SG-Bi-CU1"))
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1.1)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      auxDisplay() {
        let pow = new Decimal(10)
        return pow
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
         <div class='Buyable-Style'>
         <b class='Body-Text-L'>${format(SV, 0)}</b>
         <b class='Title-Text-M'>UP1</b>
         <b class='Body-Text-XL'>SGi is ${format(S.auxDisplay)}% more stronger </b>
         <b class='Body-Text-S'>${format(S.cost)} ★</b>
         <br>
         </div>`
      },
      buy() {
        player[this.layer].sgBits = player[this.layer].sgBits.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].sgBits.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/SGi-Can.png')",
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
          "background-image": "url('images/SGi-Cant.png')",
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
    "SG-Bi-UP2": {
      cost(x) {
        let base = new Decimal(3);
        let factor = new Decimal(1);
        let iterations = x;
        let calc = exponential(base, factor, iterations).mul(70)
        calc = calc.div(buyableEffect("SG", "SG-Bi-CU1"))
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1.15)
        pow = pow.mul(buyableEffect("SG", "SG-Bi-UP4"))
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      auxDisplay() {
        let pow = new Decimal(15)
        pow = pow.mul(buyableEffect("SG", "SG-Bi-UP4"))
        return pow
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
         <div class='Buyable-Style'>
         <b class='Body-Text-L'>${format(SV, 0)}</b>
         <b class='Title-Text-M'>UP2</b>
         <b class='Body-Text-XL'>SGi is ${format(S.auxDisplay)}% more stronger </b>
         <b class='Body-Text-S'>${format(S.cost)} ★</b>
         <br>
         </div>`
      },
      buy() {
        player[this.layer].sgBits = player[this.layer].sgBits.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].sgBits.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/SGi-Can.png')",
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
          "background-image": "url('images/SGi-Cant.png')",
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
    "SG-Bi-UP3": {
      cost(x) {
        let base = new Decimal(1.5);
        let factor = new Decimal(1.4);
        let iterations = x;
        let calc = doubleGeometric(base, factor, iterations).mul(150)
        calc = calc.div(buyableEffect("SG", "SG-Bi-CU1"))
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1.3)
        let calc = new Decimal.pow(pow, x)
        return calc
      },
      auxDisplay() {
        let pow = new Decimal(30)
        return pow
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
         <div class='Buyable-Style'>
         <b class='Body-Text-L'>${format(SV, 0)}</b>
         <b class='Title-Text-M'>UP3</b>
         <b class='Body-Text-XL'>SGi is ${format(S.auxDisplay)}% more stronger </b>
         <b class='Body-Text-S'>${format(S.cost)} ★</b>
         <br>
         </div>`
      },
      buy() {
        player[this.layer].sgBits = player[this.layer].sgBits.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].sgBits.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/SGi-Can.png')",
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
          "background-image": "url('images/SGi-Cant.png')",
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
    "SG-Bi-UP4": {
      cost(x) {
        let base = new Decimal(3);
        let factor = new Decimal(1.5);
        let iterations = x;
        let calc = doubleGeometric(base, factor, iterations).mul(400)
        calc = calc.div(buyableEffect("SG", "SG-Bi-CU1"))
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1.05)
        return new Decimal.pow(pow, x)
      },
      auxDisplay1() {
        let pow = new Decimal(5)
        return pow
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
         <div class='Buyable-Style'>
         <b class='Body-Text-L'>${format(SV, 0)}</b>
         <b class='Title-Text-M'>UP4</b>
         <b class='Body-Text-XL'>UP2 is ${format(S.auxDisplay1)}% more stronger</b>
         <b class='Body-Text-S'>${format(S.cost)} ★</b>
         <br>
         </div>`
      },
      buy() {
        player[this.layer].sgBits = player[this.layer].sgBits.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].sgBits.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/SGi-Can.png')",
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
          "background-image": "url('images/SGi-Cant.png')",
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
    "SG-Bi-CU1": {
      cost(x) {
        let base = new Decimal(1.05);
        let factor = new Decimal(1.05);
        let iterations = x;
        let calc = doubleGeometric(base, factor, iterations).mul(2000)
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1.05)
        return new Decimal.pow(pow, x)
      },
      auxDisplay1() {
        let pow = new Decimal(5)
        return pow
      },
      unlocked() {
        return player.SG.sgBitsSacA.gte(2)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `
         <div class='Buyable-Style'>
         <b class='Body-Text-L'>${format(SV, 0)}</b>
         <b class='Title-Text-M'>CU1</b>
         <b class='Body-Text-XL'>All UP above are ${format(S.auxDisplay1)}% more cheaper </b>
         <b class='Body-Text-S'>${format(S.cost)} ★</b>
         <br>
         </div>`
      },
      buy() {
        player[this.layer].sgBits = player[this.layer].sgBits.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].sgBits.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/SGi-Can.png')",
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
          "background-image": "url('images/SGi-Cant.png')",
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
  displayRow: 0,
  layerShown() { return hasMilestone("T", "T0-12") },
  tabFormat: {
    "Main Progression": {
      content: [
              "blank",
              ['raw-html', () => {
          return `<b class='Main-Text'>You have <b class='Currency-Text'>${format(player.SG.sgBits)}</b> ★</b>`
              }],
              ['raw-html', () => {
          return `<b class='Main-Sub-Text'>You generate <b class='Currency-Sub-Text'>${format(tmp.SG.sgiCalc)}</b> ★ / sec</b>`
              }],
              ['raw-html', () => {
          return `<b class='Main-Sub-Text'>This ★ type, boosts Bit gain by <b class='Currency-Sub-Text'>${format(tmp.SG.sgiBoost1)}</b>x</b>`
              }],
              "blank",
            ['raw-html', () => {
          if (player.SG.sgBitsSac.gte(0.1)) {
            return `<b class='Main-Sub-Text'>You have <b class='Currency-Sub-Text'>${format(player.SG.sgBitsSac)}</b> ★ Essence</b>`
          }
          else return ``
                                      }],
            ['raw-html', () => {
          if (player.SG.sgBitsSac.gte(0.1)) {
            return `<b class='Main-Sub-Text'>NEXT SAC AT <b class='Currency-Sub-Text'>${format(tmp.SG.sgiSacrificeReq)}</b> || <b class='Currency-Sub-Text'>${format(tmp.SG.sgiSacrificeReqCalc)}</b></b>`
          }
          else return ``
                                      }],
            ['raw-html', () => {
          if (player.SG.sgBitsSac.gte(0.1)) {
            return `<b class='Main-Sub-Text'>Your ★ Essence also boosts this ★ gain by <b class='Currency-Sub-Text'>${format(tmp.SG.sgiSacBoost)}</b>x</b>`
          }
          else return ``
                          }],
              "blank",
              "h-line",
              ["row", [["clickable", "resetdebugging"]]],
              ["row", [["clickable", "doSGiSac"]]],
              ["row", [["buyable", "SG-Bi-UP1"]]],
              ["row", [["buyable", "SG-Bi-UP2"]]],
              ["row", [["buyable", "SG-Bi-UP3"]]],
              ["row", [["buyable", "SG-Bi-UP4"]]],
              ["row", [["buyable", "SG-Bi-CU1"]]]
              ],
    },
  },
})