from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    cost = models.IntegerField()
    category = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    ingredients = models.TextField(blank=True, null=True)
    photo_url = models.URLField(max_length=255, blank=True, null=True)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    def __str__(self):
        return self.name

class Cart(models.Model):
    menu_item = models.OneToOneField(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.menu_item.name} - {self.quantity}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    order_code = models.CharField(max_length=255, unique=True)
    total_cost = models.IntegerField(default=0)
    instructions = models.TextField(blank=True, null=True)
    client_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=12)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_code}"

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, to_field='order_code')
    quantity = models.IntegerField()
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.order.order_code} - {self.menu_item.name} x{self.quantity}"
