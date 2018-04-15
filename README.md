# Scroll Motion

Small vanilla javascript library for x,y transforms while scrolling

## Public URL

### https://dev.stevenjacobprice.com/scroll_motion/

## Inspiration
+ RELLAX.js [github](https://github.com/yairEO/rellax)

## Getting Started

```html
<div class="scroll-motion" data-speed-y="-2">
  Vertical scroll slow
</div>
<div class="scroll-motion" data-speed-y="7">
  Vertical scroll fast
</div>
<div class="rellax" data-speed-x="3">
  Horizontal scroll
</div>

<script src="scroll-motion.js"></script>
<script>
  // Accepts any class name
  var scrollMotion = new ScrollMotion('.scroll-motion');
</script>
```
```html
<script>
  // Also can pass in optional settings block
  let scrollMotion = new ScrollMotion('.scroll-motion', {
    speedX: -2,
    speedY: 0,
    observe: 1,
  });
  scrollMotion();
</script>
```

### Prerequisites

+ intersection-observer.js | [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)

### Installing

To get Scroll Motion running on your local machine do the following steps.

1. ```git clone https://github.com/whiteboxpub/scroll-motion.git```
2. ```cd scroll-motion```

or 

1. ```npm install intersection-observer``` (polyfill)
2. ```npm install scroll-motion```

## Built With
* Vanilla JS

## Authors
+ **Steven Price** - *Inital work* - [stevenjacobprice.com](https://www.stevenjacobprice.com/), [GitHub](https://github.com/whiteboxpub)

See also the list of [contributors](https://github.com/whiteboxpub/random-intel-codename/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://raw.githubusercontent.com/BTBTravis/mke-bus-graphql/master/LICENSE.md) file for details
