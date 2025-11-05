import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="text-center space-y-6 p-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
          <FileQuestion className="w-10 h-10 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Istilah Tidak Ditemukan</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Istilah budaya yang Anda cari tidak ditemukan dalam glosarium kami.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/budaya/daerah/-">
            <Button variant="outline">Lihat Semua Istilah</Button>
          </Link>
          <Link href="/peta-budaya">
            <Button className="bg-primary hover:bg-primary/90">Kembali ke Peta Budaya</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
