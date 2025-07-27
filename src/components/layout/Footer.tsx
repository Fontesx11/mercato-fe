export default function Footer() {
  return (
    <footer className="bg-blue-300 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Sweetdeli</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Contato</p>
              <p>sac@mercatoonline.com</p>
              <p>+55 81 92345-0986</p>
              <p>123 Rua, Pernambuco, Brasil</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Outros sites</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Desenvolvedores</p>
              <p>Mercato Pay</p>
              <p>Minha Página</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Sobre o</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Mercato Online</p>
              <p>Sustentabilidade</p>
              <p>Tendências</p>
              <p>Investor relations</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Get the app</h4>
            <div className="space-y-3">
              <div className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                📱 Download on the App Store
              </div>
              <div className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                📱 GET IT ON Google Play
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
