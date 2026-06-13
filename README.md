# TIMECODE

Rellotge en temps real que mostra l'hora mitjançant gestos de mans, pensat per a pantalles grans en actuacions en viu.

## Fitxers principals

| Fitxer | Descripció |
|---|---|
| `index.html` | Vista simple (fons blanc, mans negres) |
| `negative.html` | Vista simple invertida (fons negre, mans blanques) |
| `double.html` | Vista doble 4:1 — mig esquerre normal, mig dret invertit |

---

## Configuració de `double.html`

Tots els paràmetres es troben directament dins el `<script>` de `double.html`. No cal cap servidor web: es pot obrir directament com a fitxer local.

```js
var config = {

  // --- Temporització ---

  time_dospunts: 400,
  // Mil·lisegons fins que apareix l'efecte de zoom als dos punts (:)

  time_next_xifra: 1200,
  // Mil·lisegons entre la primera i la segona xifra d'un número de dos dígits

  time_next: 1500,
  // Mil·lisegons entre cada pas de l'animació (hora → : → minuts → : → segons)

  time_stop: 5,
  // Segons que s'atura l'animació quan es prem la tecla "p"

  // --- Aparença general ---

  negative: false,
  // Només per a index.html i negative.html. A double.html no té efecte.

  debug: true,
  // Si és true, mostra l'hora en text a la part inferior de cada panell

  // --- Mida i posició de les mans ---

  hand_width_percent: 30,
  // Amplada de cada imatge de mà, en % del panell.
  // Els dos punts (:) fan servir el doble d'aquest valor.

  hands_center_offset_px: 0,
  // Desplaçament horitzontal fi del conjunt de mans respecte al centre del panell.
  // Valors positius mouen cap a la dreta, negatius cap a l'esquerra.

  hands_offset_bottom_px: 0,
  // Desplaçament vertical de les mans cap amunt (en píxels).

  // --- Dos punts (:) ---

  dospunts_left_px: 0,
  // Desplaçament horitzontal dels dos punts respecte al centre del panell (en píxels).

  dospunts_zoom_margin_left_px: 0,
  // Desplaçament addicional horitzontal quan s'activa l'efecte de zoom dels dos punts.

  // --- Text de l'hora ---

  hora_font_size: 24,
  // Mida de la font del text de l'hora (en píxels). Només visible si debug: true.

  hora_bottom_px: 20,
  // Distància del text de l'hora respecte a la part inferior del panell (en píxels).

  hora_left_percent: 50,
  // Posició horitzontal del text de l'hora, en % del panell (50 = centrat).

  // --- Debug ---

  debug_aspect_ratio: false,
  // Si és true, dibuixa un rectangle vermell que marca la proporció 4:1.
  // Útil per ajustar la pantalla durant la preparació de l'actuació.

};
```

---

## Tecles

| Tecla | Acció |
|---|---|
| `p` | Atura l'animació durant `time_stop` segons |
