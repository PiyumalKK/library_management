terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "Devops"
  location = "East US"
}

resource "azurerm_container_registry" "acr" {
  name                = "LibraryContainer"  # Must be unique
  resource_group_name = azurerm_resource_group.rg.name  # Corrected reference
  location            = azurerm_resource_group.rg.location  # Corrected reference
  sku                 = "Basic"
  admin_enabled       = true
}
