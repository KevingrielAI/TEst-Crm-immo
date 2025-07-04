# Application de calcul de coûts pour entreprises de couverture

Ce projet fournit un petit outil en ligne de commande permettant d'estimer le coût
d'une prestation de couverture de toiture. Les tarifs sont définis dans le fichier
`cost_calculator.py` et peuvent être adaptés selon vos besoins.

## Utilisation rapide

```bash
python3 cost_calculator.py SURFACE TYPE [-o OPTION]
```

- `SURFACE` : surface de toiture en mètres carrés.
- `TYPE` : type de couverture parmi `tuile`, `metal` ou `ardoise`.
- `-o`/`--option` : option supplémentaire (par exemple `nettoyage_gouttiere`).

Exemple :

```bash
python3 cost_calculator.py 50 tuile -o nettoyage_gouttiere
```

L'outil affichera le coût total calculé.

## Tests

Les tests unitaires sont écrits avec `pytest`. Pour les exécuter :

```bash
pytest
```
