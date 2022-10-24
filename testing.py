import unittest


class User:
    def __init__(self, age: int, name: str) -> None:
        self.age = age
        self.name = name


user1 = User(29, "John")


class Rectangle:
    def __init__(self, width: float, height: float) -> None:
        self.width = width
        self.height = height

    def get_area(self) -> float:
        return self.width * self.height

    def get_perimeter(self) -> float:
        return 2 * (self.width + self.height)

    def set_width(self, width: float) -> None:
        self.width = width

    def set_height(self, height: float) -> None:
        self.height = height


class RectangleTest(unittest.TestCase):
    def test_get_area(self):
        rectangle = Rectangle(10, 5)
        self.assertEqual(rectangle.get_area(), 50)

    def test_get_perimeter(self):
        rectangle = Rectangle(10, 5)
        self.assertEqual(rectangle.get_perimeter(), 30)

    def test_set_width(self):
        rectangle = Rectangle(10, 5)
        rectangle.set_width(20)
        self.assertEqual(rectangle.width, 20)

    def test_set_height(self):
        rectangle = Rectangle(10, 5)
        rectangle.set_height(20)
        self.assertEqual(rectangle.height, 20)


unittest.main()
