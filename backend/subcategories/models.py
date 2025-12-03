from django.db import models
from categories.models import Category

class Subcategory(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False)
    name = models.CharField(max_length=200, null=False, blank=False)

    class Meta:
        unique_together = [
            ("category_id", "name")
        ]
        verbose_name = "Subcategory"
        verbose_name_plural = "Subcategories"

    def __str__(self) -> str:
        return f"Subcat. name: {self.name}"
