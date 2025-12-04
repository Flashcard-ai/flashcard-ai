from django.db import models
from categories.models import Category
from subcategories.models import Subcategory
from decks.models import Deck

class Card(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False)
    subcategory_id = models.ForeignKey(Subcategory, on_delete=models.CASCADE, null=True, blank=True)
    deck_id = models.ForeignKey(Deck, on_delete=models.CASCADE, null=False, blank=False)
    question = models.TextField(null=False, blank=False)
    answer = models.TextField(null=False, blank=False)

    class Meta:
        verbose_name = "Card"
        verbose_name_plural = "Cards"

    def __str__(self) -> str:
        return f"Card Question: {self.question}"
