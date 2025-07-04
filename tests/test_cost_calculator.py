import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
import pytest
from cost_calculator import calculate_cost


def test_basic_cost():
    assert calculate_cost(10, 'tuile') == 500


def test_with_option():
    assert calculate_cost(10, 'metal', ['nettoyage_gouttiere']) == 10 * (60 + 15)


def test_invalid_type():
    with pytest.raises(ValueError):
        calculate_cost(5, 'inconnu')


def test_invalid_option():
    with pytest.raises(ValueError):
        calculate_cost(5, 'tuile', ['invalid'])
