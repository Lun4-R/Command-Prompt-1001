addLayer("T", {
    name: "Tier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Tier", // Name of prestige currency
    baseResource: "Bits", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 999, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["ST"],
    T3bonus() {
      let base = new Decimal(3)
      base = base.mul(hasMilestone("T", "T0-7") ? 3 : 1)
      let tier = player.T.points
      return new Decimal.pow(base, tier)
    },
    T7bonus() {
      let base = new Decimal(5)
      let tier = player.T.points
      return new Decimal.pow(base, tier)
    },
    milestones: {
      "T0-1" : {
        requirementDescription() {
            return `
            <b class='Title-Text-L'>1st Tier</b>`
          },
          done() { return player.T.points.gte(1) },
          effectDescription: `
          <b class="Body-Text-M">
          + Unlock 3rd T0 ST buyable
          </b>`,
          style() {
            return {
              "background": "#ffffff",
              "background-size": "50% !important",
              "width": "600px",
              "height": "auto",
              "padding": "5px",
              "border": "0px solid",
              "border-radius": "10px",
              "color": "#000000"
            }
          },
          unlocked() {
            return true
          }
      },
      "T0-2" : {
        requirementDescription() {
            return `
            <b class='Title-Text-L'>2nd Tier</b>`
          },
          done() { return player.T.points.gte(2) },
          effectDescription: `
          <b class="Body-Text-M">
          + Unlock 4th T0 ST buyable
          </b>`,
          style() {
            return {
              "background": "#ffffff",
              "background-size": "50% !important",
              "width": "600px",
              "height": "auto",
              "padding": "5px",
              "border": "0px solid",
              "border-radius": "10px",
              "color": "#000000"
            }
          },
          unlocked() {
            return hasMilestone(this.layer, "T0-1")
          }
      },
      "T0-3" : {
        requirementDescription() {
            return `
            <b class='Title-Text-L'>3rd Tier</b>`
          },
          done() { return player.T.points.gte(3) },
          effectDescription: `
          <b class="Body-Text-M">
          + Gain 3x more ST per Tier<br>
          + 1st & 2nd T0 ST buyable base power is weake

          </b>`,
          style() {
            return {
              "background": "#ffffff",
              "background-size": "50% !important",
              "width": "600px",
              "height": "auto",
              "padding": "5px",
              "border": "0px solid",
              "border-radius": "10px",
              "color": "#000000"
            }
          },
          unlocked() {
            return hasMilestone(this.layer, "T0-2")
          }
      },
      "T0-4": {
        requirementDescription() {
          return `
            <b class='Title-Text-L'>4th Tier</b>`
        },
        done() { return player.T.points.gte(4) },
        effectDescription: `
          <b class="Body-Text-M">
          + 1st T0 ST buyable base is multiplied by itself ( x * 0.142 )<br>
          + 1st & 2nd T0 ST buyable base power weaker
          </b>`,
        style() {
          return {
            "background": "#ffffff",
            "background-size": "50% !important",
            "width": "600px",
            "height": "auto",
            "padding": "5px",
            "border": "0px solid",
            "border-radius": "10px",
            "color": "#000000"
          }
        },
        unlocked() {
          return hasMilestone(this.layer, "T0-3")
        }
      },
      "T0-5": {
        requirementDescription() {
          return `
            <b class='Title-Text-L'>5th Tier</b>`
        },
        done() { return player.T.points.gte(5) },
        effectDescription: `
          <b class="Body-Text-M">
          + Unlock Ethereum<br>
          + Upgrade Bit Machines into Byte Machines
          </b>`,
        style() {
          return {
            "background": "#ffffff",
            "background-size": "50% !important",
            "width": "600px",
            "height": "auto",
            "padding": "5px",
            "border": "0px solid",
            "border-radius": "10px",
            "color": "#000000"
          }
        },
        unlocked() {
          return hasMilestone(this.layer, "T0-4")
        }
      },
      "T0-6": {
        requirementDescription() {
          return `
            <b class='Title-Text-L'>7th Tier</b>`
        },
        done() { return player.T.points.gte(7) },
        effectDescription: `
          <b class="Body-Text-M">
          + Unlock 3rd T0 ETH Buyable<br>
          + Gain 5x more Bits per Tier
          </b>`,
        style() {
          return {
            "background": "#ffffff",
            "background-size": "50% !important",
            "width": "600px",
            "height": "auto",
            "padding": "5px",
            "border": "0px solid",
            "border-radius": "10px",
            "color": "#000000"
          }
        },
        unlocked() {
          return hasMilestone(this.layer, "T0-5")
        }
      },
      "T0-7": {
        requirementDescription() {
          return `
            <b class='Title-Text-L'>9th Tier</b>`
        },
        done() { return player.T.points.gte(9) },
        effectDescription: `
          <b class="Body-Text-M">
          + Improve T3 1st milestone by 3x
          </b>`,
        style() {
          return {
            "background": "#ffffff",
            "background-size": "50% !important",
            "width": "600px",
            "height": "auto",
            "padding": "5px",
            "border": "0px solid",
            "border-radius": "10px",
            "color": "#000000"
          }
        },
        unlocked() {
          return hasMilestone(this.layer, "T0-6")
        }
      },
      "T0-8": {
        requirementDescription() {
          return `
            <b class='Title-Text-L'>11th Tier</b>`
        },
        done() { return player.T.points.gte(11) },
        effectDescription: `
          <b class="Body-Text-M">
          + Unlock 4th T0 ETH Buyable<br>
          + Unlock a assortments of new Token upgrades ( soon )
          </b>`,
        style() {
          return {
            "background": "#ffffff",
            "background-size": "50% !important",
            "width": "600px",
            "height": "auto",
            "padding": "5px",
            "border": "0px solid",
            "border-radius": "10px",
            "color": "#000000"
          }
        },
        unlocked() {
          return hasMilestone(this.layer, "T0-7")
        }
      },
      "T0-9": {
        requirementDescription() {
          return `
            <b class='Title-Text-L'>13th Tier</b>`
        },
        done() { return player.T.points.gte(13) },
        effectDescription: `
          <b class="Body-Text-M">
          + 1st & 2nd T0 ST buyable base power are weaker<br>
          + 3rd & 4th T0 ST buyable base power are weaker
          </b>`,
        style() {
          return {
            "background": "#ffffff",
            "background-size": "50% !important",
            "width": "600px",
            "height": "auto",
            "padding": "5px",
            "border": "0px solid",
            "border-radius": "10px",
            "color": "#000000"
          }
        },
        unlocked() {
          return hasMilestone(this.layer, "T0-8")
        }
      },
      "T0-10": {
        requirementDescription() {
          return `
            <b class='Title-Text-L'>15th Tier ( ENDGAME OF 0.0.2x )</b>`
        },
        done() { return player.T.points.gte(15) },
        effectDescription: `
          <b class="Body-Text-M">
          Upgrade hardware from 8-bit to 10-bit<br>
          + Improve ETH Cooling rate<br>
          + Unlock Rebooting ( soon )
          </b>`,
        style() {
          return {
            "background": "#ffffff",
            "background-size": "50% !important",
            "width": "600px",
            "height": "auto",
            "padding": "5px",
            "border": "0px solid",
            "border-radius": "10px",
            "color": "#000000"
          }
        },
        unlocked() {
          return hasMilestone(this.layer, "T0-9")
        }
      }
    },
    layerShown(){return true}
})
