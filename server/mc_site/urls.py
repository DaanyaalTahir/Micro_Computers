from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register('customers', views.CustomerViewSet)
router.register('items', views.ItemViewSet)
router.register('cart', views.CartViewSet)
router.register('payment', views.PaymentViewSet)
router.register('address', views.AddressViewSet)
router.register('orders', views.OrderViewSet)
router.register('ordered-item', views.OrderedItemViewSet)

urlpatterns = [
    path('login/', views.login, name="login-customer"),
]
