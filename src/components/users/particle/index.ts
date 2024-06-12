import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const options = {
      background: {
        color: {
          value: 'transparent'
        },
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover'
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push'
          },
          onHover: {
            enable: true,
            mode: 'connect'
          }
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40
          },
          push: {
            quantity: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: 'random'
        },
        collisions: {
          absorb: {
            speed: 2
          }
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: 'bounce',
          random: false,
          speed: 7,
          straight: false
        },
        number: {
          density: {
            enable: true
          },
          value: 650
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 1, max: 1 }
        }
      },
      detectRetina: true,
      fullScreen: {
        enable: false
      }
    }

    const particlesLoaded = async (container: any) => {
      console.log('Particles container loaded', container)
    }

    return {
      particlesLoaded,
      options
    }
  }
})
