COVERAGE_RATES = {
    'tuile': 50,  # prix par m2 en euros
    'metal': 60,
    'ardoise': 80
}

OPTION_RATES = {
    'nettoyage_gouttiere': 15  # prix par m2 pour nettoyage des gouttières
}

def calculate_cost(area, coverage_type, options=None):
    """Calcule le coût total pour une surface donnée.

    :param area: surface en m2
    :param coverage_type: type de couverture (tuile, metal, ardoise)
    :param options: liste d'options supplémentaires (ex: ['nettoyage_gouttiere'])
    :returns: coût total en euros
    """
    if coverage_type not in COVERAGE_RATES:
        raise ValueError(f"Type de couverture inconnu: {coverage_type}")

    base_cost = area * COVERAGE_RATES[coverage_type]
    options = options or []
    additional = 0
    for opt in options:
        if opt not in OPTION_RATES:
            raise ValueError(f"Option inconnue: {opt}")
        additional += area * OPTION_RATES[opt]
    return base_cost + additional


def main(argv=None):
    import argparse
    parser = argparse.ArgumentParser(description="Calcul de coûts de couverture")
    parser.add_argument('surface', type=float, help="Surface en m2")
    parser.add_argument('type', choices=list(COVERAGE_RATES.keys()),
                        help="Type de couverture")
    parser.add_argument('-o', '--option', action='append', dest='options',
                        choices=list(OPTION_RATES.keys()),
                        help="Options supplémentaires", default=[])
    args = parser.parse_args(argv)

    total = calculate_cost(args.surface, args.type, args.options)
    print(f"Coût total: {total:.2f} €")


if __name__ == '__main__':
    main()
