from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from django.db.models import Q

from functools import partial
from telnetlib import STATUS
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.db.models.functions import Trunc
from django.db.models import DateTimeField

class CustomerViewSet(viewsets.ModelViewSet):
	queryset = Customer.objects.all()
	serializer_class = CustomerSerializer

	def create(self, request, *args, **kwargs):
		if Customer.objects.filter(email=request.data['email']).exists():
			return Response("Email Already Exists", status=status.HTTP_403_FORBIDDEN)
		serializer = CustomerSerializer(data=request.data)

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		
		return Response("Data Not Acceptable", status=status.HTTP_406_NOT_ACCEPTABLE)

class ItemViewSet(viewsets.ModelViewSet):
	queryset = Item.objects.all()
	serializer_class = ItemSerializer

	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['featured_status']


	@action(detail=False, methods=["get"])
	def search_results(self, request):
		query = self.request.query_params.get('query')
		results = self.get_queryset().filter((
				Q(item_name__icontains=query) | 
				Q(brand__icontains=query) | 
				Q(label__icontains=query) | 
				Q(type__icontains=query) | 
				Q(description__icontains=query)
			))
		serializer = self.get_serializer(results, many=True)
		return Response(serializer.data)

class CartViewSet(viewsets.ModelViewSet):
	queryset = Cart.objects.all()

	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['user_id','item_id']

	def get_serializer_class(self):
		if self.request.method == 'POST' or self.request.method == 'PUT':
			return CartSerializer
		return CartExpandedSerializer

class PaymentViewSet(viewsets.ModelViewSet):
	queryset = Payment.objects.all()
	serializer_class = PaymentSerializer

class AddressViewSet(viewsets.ModelViewSet):
	queryset = Address.objects.all()
	serializer_class = AddressSerializer

class OrderViewSet(viewsets.ModelViewSet):
	queryset = Order.objects.all().order_by(
		Trunc(
			'purchased_date', 
			'date', 
			output_field=DateTimeField()).desc(),
			'-purchased_date'
			)

	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['user_id']

	def get_serializer_class(self):
		if self.request.query_params.get('all_info'):
			return OrderExpandedSerializer
		if self.request.method == 'POST' or self.request.method == 'PUT':
			return OrderSerializer
		return OrderExpandedSerializer

class OrderedItemViewSet(viewsets.ModelViewSet):
	queryset = OrderedItem.objects.all()
	serializer_class = OrderedItemSerializer

	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['order_id']

	def get_serializer_class(self):
		if self.request.method == 'POST' or self.request.method == 'PUT':
			return OrderedItemSerializer
		return OrderedItemExpandedSerializer


@api_view(['POST'])
def login(request):
	try:
		customer = Customer.objects.get(email=request.data['email'], password=request.data['password'])
	except Exception as e:
		return Response("User not found",status=status.HTTP_401_UNAUTHORIZED)
	serializer = CustomerSerializer(customer, many=False)
	return Response(serializer.data)

