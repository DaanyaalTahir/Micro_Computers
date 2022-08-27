from django.db import models

# Create your models here.
class Customer(models.Model):
    first_name = models.CharField(max_length=25, null=False, blank=False)
    last_name = models.CharField(max_length=25, null=False, blank=False)
    email = models.EmailField(max_length=40, null=False, blank=False)
    password = models.CharField(max_length=250, null=False, blank=False)
    phone_number = models.CharField(max_length=20, null=False, blank=False)

class Item(models.Model):
    item_name = models.CharField(max_length=30, null=False, blank=False)
    brand = models.CharField(max_length=25, null=False, blank=False)
    label = models.CharField(max_length=100, null=False, blank=False)
    type = models.CharField(max_length=25, null=False, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    description = models.CharField(max_length=500, null=False, blank=False)
    free_shipping = models.BooleanField(null=False, blank=False)
    stock = models.IntegerField(null=False, blank=False)
    featured_status = models.BooleanField(null=False, blank=False)
    picture = models.ImageField(null=True, blank=True)

class Cart(models.Model):
    user_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    date_added = models.DateTimeField(null=False, blank=False)
    quantity = models.IntegerField(null=False, blank=False)
    item_price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)

class Payment(models.Model):
    user_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    card_number = models.CharField(max_length=100, null=False, blank=False)
    expiry_date = models.CharField(max_length=50, null=False, blank=False)
    ccv = models.CharField(max_length=50, null=False, blank=False)
    payment_type = models.CharField(max_length=50, null=False, blank=False)

class Address(models.Model):
    user_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, null=False, blank=False)
    street = models.CharField(max_length=100, null=False, blank=False)
    unit_apt = models.CharField(max_length=50, null=False, blank=False)
    province_state = models.CharField(max_length=50, null=False, blank=False)
    postal_code = models.CharField(max_length=50, null=False, blank=False)
    country = models.CharField(max_length=50, null=False, blank=False)

class Order(models.Model):
    user_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    payment_method = models.ForeignKey(Payment, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    purchased_date = models.DateTimeField(null=False, blank=False)
    item_subtotal = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    tax = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)

class OrderedItem(models.Model):
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False, blank=False)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
