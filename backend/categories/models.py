from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model() # Pega sempre o modelo User definido no
#AUTH_USER_MODEL do settings, para que mesmo que eu troque os campos,
#ou renomeie o modelo, não precisar alterar cada import

class Category(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    name = models.CharField(max_length=200, null=False, blank=False)

    class Meta:
        unique_together = [
            ("owner", "name") # Um dono não pode ter categorias com o mesmo nome, mas donos diferentes sim
        ]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return f"Category name: {self.name}"