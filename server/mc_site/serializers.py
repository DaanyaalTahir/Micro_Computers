from rest_framework import serializers
from .models import *

class CustomerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Customer
		fields =['id', 'first_name', 'last_name', 'email', 'password', 'phone_number']

		extra_kwargs = {'password': {'write_only': True}}

class ItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = Item
		fields ='__all__'

class CartSerializer(serializers.ModelSerializer):
	class Meta:
		model = Cart
		fields ='__all__'

class CartExpandedSerializer(serializers.ModelSerializer):
	item_id = ItemSerializer()
	class Meta:
		model = Cart
		fields ='__all__'

class PaymentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Payment
		fields ='__all__'

class AddressSerializer(serializers.ModelSerializer):
	class Meta:
		model = Address
		fields ='__all__'

class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model = Order
		fields ='__all__'

class OrderExpandedSerializer(serializers.ModelSerializer):
	address = AddressSerializer()
	payment_method = PaymentSerializer()
	class Meta:
		model = Order
		fields ='__all__'

	def create(self, validated_data):
		addressData = validated_data.pop('address')
		paymentData = validated_data.pop('payment_method')
		
		address =  Address.objects.create(**addressData)
		payment = Payment.objects.create(**paymentData)
		order = Order.objects.create(address=address, payment_method=payment, **validated_data)
		return order

class OrderedItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = OrderedItem
		fields ='__all__'

class OrderedItemExpandedSerializer(serializers.ModelSerializer):
	item_id = ItemSerializer()
	class Meta:
		model = OrderedItem
		fields ='__all__'
