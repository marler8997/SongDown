The SongDown Data Structures
==================================================

#### The Song data structure

field   | type              | description
--------|-------------------|-----------------------------------
title   | string            | The title of the song
credit  | string            | Composer/Performer of the song
sections| Section[]         | Sections of the song
key     | Key               | The key of the song

#### The Section data structure

field   | type              | description
--------|-------------------|-----------------------------------
lines   | LinePhrase[]      | The lines of the sections

#### The LinePhrase data structure

field   | type              | description
--------|-------------------|-----------------------------------
chords  | string            | The chords for this line of the song
lyrics  | string            | The lyrics for this line of the song
Repeat  | ?                 |

#### The Key data structure

field   | type              | description
--------|-------------------|-----------------------------------
letter  | string            | The letter part only of the chord (A, B, C, D, E, F, G)
shift   | string            | Empty String "", Flat "b" or Sharp "#"
minor   | string            | Empty String "" if major, "m" if minor
string  | string            | The string representation of the chords ( letter + shift + minor )

#### The Chord data structure

field   | type              | description
--------|-------------------|-----------------------------------
letter  | string            | The letter part only of the chord (A, B, C, D, E, F, G)
shift   | string            | Empty String "", Flat "b" or Sharp "#"
minor   | string            | Empty String "" if major, "m" if minor
numeral | string            | The chord numeral (major: I, II, III, IV, V, VI, VII), (minor: i, ii, iii, iv, v, vi, vii)
