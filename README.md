# Workout-Timer (Entwurf)

Offline-fähige Einzeldatei-App (`index.html`) für eigene Workouts – optimiert fürs Smartphone.

## Modi
- **Tabata / EMOM** – Belastung, Pause, Runden und optionale Rundenpause frei einstellbar (Standard 50 s / 10 s). Anzeige: aktuelle und nächste Übung, Countdown, Gesamtrestzeit.
- **AMRAP** – Zeitlimit läuft rückwärts, großer Button „Runde fertig“. Am Ende: Runden, Rundenzeiten, Ø, schnellste/langsamste Runde.
- **For Time** – Stoppuhr, großer Button je Runde, stoppt automatisch nach der eingestellten Rundenzahl. Optionales Zeitlimit (Time Cap). Am Ende: Gesamtzeit, Rundenzeiten, Ø.
- **Angefangene Runde** – bei AMRAP sowie bei For Time mit erreichtem Zeitlimit oder Abbruch trägst du am Ende die zusätzlichen Wiederholungen ein (z. B. „5 Runden + 12 Wdh.“).

## Funktionen
- Workouts mit Übungsreihenfolge (+ optionaler Info wie „15 Wdh.“) speichern, bearbeiten, duplizieren
- Letzte Einstellungen werden pro Workout gemerkt
- Töne (3-2-1), optionale Sprachansage, Vibration, Bildschirm bleibt an
- Verlauf aller Trainings, Export/Import als JSON-Datei
- Darstellung: Automatisch / Hell / Dunkel (Einstellungen)

## Nutzung (offline am Handy)
1. Einmalig auf GitHub: *Settings → Pages → Build and deployment → Source: Deploy from a branch*, Branch wählen, Ordner `/ (root)`, *Save*.
2. Nach 1–2 Minuten ist die App unter `https://<benutzername>.github.io/Test-Chat-gpt/` erreichbar.
3. Am Handy öffnen und zum Home-Bildschirm hinzufügen (Android: Chrome → Menü ⋮ → „App installieren“ bzw. „Zum Startbildschirm hinzufügen“).
4. Ab dann läuft die App komplett ohne Internet. Updates werden beim nächsten Öffnen mit Netz im Hintergrund geladen.

Daten liegen nur auf dem jeweiligen Gerät – zur Sicherung „Einstellungen → Exportieren“.
Hinweis: Bei Änderungen an den Dateien in `sw.js` die `VERSION` erhöhen.
