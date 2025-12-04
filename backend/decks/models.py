from django.db import models
from categories.models import Category
from subcategories.models import Subcategory

class Deck(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False)
    subcategory_id = models.ForeignKey(Subcategory, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=False, blank=False)

    class Meta:
        unique_together = [
            ("category_id", "name"),
            ("subcategory_id", "name")
        ]
        verbose_name = "Deck"
        verbose_name_plural = "Decks"

    def __str__(self) -> str:
        return f"Deck name: {self.name}"