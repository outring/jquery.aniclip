# AniClip

jQuery plugin for clip css property animation.

## Why AniClip?

AniClip the only plugin with support for ```auto``` values (```rect(auto auto auto auto)```), i.e. it does not replace them with ```0px```.

## Usage

```javascript
$('el').animate({ clip: 'rect(auto auto 100px auto)' });
```

## Note

For the moment AnyClip has no support for animation from/to ```auto``` values, so be sure to have exact values specified before the animation.

```javascript
$('el').css({ clip: 'rect(auto auto 0px auto)' }).animate({ clip: 'rect(auto auto 100px auto)' });
```

Or

```javascript
el {
    clip: rect(auto auto 0px auto);
}
```

```javascript
$('el').animate({ clip: 'rect(auto auto 100px auto)' });
```