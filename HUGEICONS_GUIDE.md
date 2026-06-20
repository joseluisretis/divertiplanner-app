# HugeIcons Setup Guide

HugeIcons está instalado y configurado en el proyecto. Esta es una librería moderna de iconos SVG con gran variedad de diseños.

## Instalación
```bash
npm install hugeicons-react
```

## Uso Básico

### Opción 1: Usar componentes helper predefinidos (Recomendado)

El archivo `/src/components/ui/icons.tsx` contiene componentes helper para iconos comúnmente usados:

```tsx
import { LoginIcon, PasswordIcon, ShowPasswordIcon, HidePasswordIcon, SuccessIcon, ErrorIcon } from "@/components/ui/icons";

function MyComponent() {
  return (
    <div>
      <LoginIcon className="w-5 h-5 text-primary" />
      <PasswordIcon className="w-5 h-5" />
      <ShowPasswordIcon />
      <SuccessIcon className="w-6 h-6 text-green-500" />
    </div>
  );
}
```

### Opción 2: Importar directamente desde hugeicons-react

```tsx
import { User, Lock, Eye, EyeOff } from "hugeicons-react";

function MyComponent() {
  return (
    <div>
      <User className="w-6 h-6 text-primary" />
      <Lock className="w-6 h-6" />
      <Eye className="w-6 h-6" />
    </div>
  );
}
```

## Iconos Disponibles

### Iconos más comúnmente usados
```tsx
import {
  User,           // Usuario/Perfil
  Lock,           // Contraseña/Bloqueo
  Eye,            // Mostrar
  EyeOff,         // Ocultar
  CheckCircle,    // Éxito/Completado
  XCircle,        // Error/Cerrar
  AlertCircle,    // Advertencia
  Info,           // Información
  X,              // Cerrar
  Menu,           // Menú/Hamburguesa
  Search,         // Buscar
  Plus,           // Agregar
  Trash2,         // Eliminar
  Edit2,          // Editar
  Calendar,       // Calendario/Fecha
  MapPin,         // Ubicación
  Users,          // Grupo de usuarios
  LogOut,         // Cerrar sesión
  Clock,          // Hora/Reloj
  Check,          // Marca de verificación
  Home,           // Inicio/Casa
  Archive,        // Archivar
  Bookmark,       // Favoritos/Marcador
  Heart,          // Favorito/Corazón
  Star,           // Estrella
  Send,           // Enviar
  Copy,           // Copiar
  Share2,         // Compartir
  Download,       // Descargar
  Upload,         // Subir
} from "hugeicons-react";
```

## Ejemplos de Uso

### En componentes de formulario
```tsx
import { User, Lock } from "hugeicons-react";

<div className="flex items-center gap-3">
  <User className="w-5 h-5 text-outline" size={20} />
  <input placeholder="Usuario" />
</div>
```

### Iconos con estados
```tsx
import { SuccessIcon, ErrorIcon, LoadingIcon } from "@/components/ui/icons";

{isLoading && <LoadingIcon className="w-5 h-5" />}
{error && <ErrorIcon className="w-5 h-5 text-red-500" />}
{success && <SuccessIcon className="w-5 h-5 text-green-500" />}
```

### Botones con iconos
```tsx
import { Trash2, Edit2 } from "hugeicons-react";

<button className="flex items-center gap-2">
  <Trash2 className="w-4 h-4" size={16} />
  Eliminar
</button>

<button className="flex items-center gap-2">
  <Edit2 className="w-4 h-4" size={16} />
  Editar
</button>
```

## Personalización

### Cambiar color con Tailwind
```tsx
<User className="w-6 h-6 text-primary" />
<User className="w-6 h-6 text-red-500" />
<User className="w-6 h-6 text-green-500" />
```

### Cambiar tamaño con prop size
```tsx
<User size={16} />  // 16px
<User size={20} />  // 20px
<User size={24} />  // 24px (default)
<User size={32} />  // 32px
```

### Cambiar tamaño con Tailwind
```tsx
<User className="w-3 h-3" />  // 12px
<User className="w-4 h-4" />  // 16px
<User className="w-5 h-5" />  // 20px
<User className="w-6 h-6" />  // 24px
<User className="w-8 h-8" />  // 32px
```

### Animaciones
```tsx
import { Clock } from "hugeicons-react";

<Clock className="w-6 h-6 animate-spin" /> {/* Loading */}
<User className="w-6 h-6 hover:scale-110 transition-transform" />
<Heart className="w-6 h-6 hover:fill-red-500 transition-all" />
```

### Cambiar color directamente
```tsx
<User color="#0066cc" />
<CheckCircle color="#22c55e" />
<AlertCircle color="#f59e0b" />
```

## Estilos de HugeIcons

HugeIcons ofrece diferentes estilos para los iconos:

```tsx
import { User } from "hugeicons-react";

// Stroke (por defecto)
<User type="stroke" className="w-6 h-6" />

// Fill
<User type="fill" className="w-6 h-6" />

// Duotone
<User type="duotone" className="w-6 h-6" />
```

## Referencia de iconos útiles

| Caso de uso | Icono | Uso |
|------------|-------|-----|
| Usuario/Login | User | `<User className="w-6 h-6" />` |
| Contraseña | Lock | `<Lock className="w-6 h-6" />` |
| Mostrar contraseña | Eye | `<Eye className="w-6 h-6" />` |
| Ocultar contraseña | EyeOff | `<EyeOff className="w-6 h-6" />` |
| Éxito | CheckCircle | `<CheckCircle className="w-6 h-6 text-green-500" />` |
| Error | XCircle | `<XCircle className="w-6 h-6 text-red-500" />` |
| Advertencia | AlertCircle | `<AlertCircle className="w-6 h-6 text-yellow-500" />` |
| Información | Info | `<Info className="w-6 h-6 text-blue-500" />` |
| Menú | Menu | `<Menu className="w-6 h-6" />` |
| Buscar | Search | `<Search className="w-6 h-6" />` |
| Agregar | Plus | `<Plus className="w-6 h-6" />` |
| Eliminar | Trash2 | `<Trash2 className="w-6 h-6" />` |
| Editar | Edit2 | `<Edit2 className="w-6 h-6" />` |
| Cerrar | X | `<X className="w-6 h-6" />` |
| Calendario | Calendar | `<Calendar className="w-6 h-6" />` |
| Ubicación | MapPin | `<MapPin className="w-6 h-6" />` |
| Cerrar sesión | LogOut | `<LogOut className="w-6 h-6" />` |
| Grupo de usuarios | Users | `<Users className="w-6 h-6" />` |
| Favorito | Heart | `<Heart className="w-6 h-6" />` |
| Estrella | Star | `<Star className="w-6 h-6" />` |

## Agregar nuevos iconos

Para agregar nuevos iconos al archivo `icons.tsx`:

1. Busca el icono en https://hugeicons.com
2. Agrega el import en la parte superior
3. Opcionalmente, crea un componente helper
4. Usa en tu código

Ejemplo:
```tsx
// En icons.tsx
import { Settings } from "hugeicons-react";

export { Settings };

// En tu componente
import { Settings } from "@/components/ui/icons";

<Settings className="w-6 h-6" size={24} />
```

## Referencia oficial

Para ver todos los iconos disponibles, visita: https://hugeicons.com
