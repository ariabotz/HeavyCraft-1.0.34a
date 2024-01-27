require('./setting')
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    getAggregateVotesInPollMessage,
    proto,
  } = require('@whiskeysockets/baileys'),
  fs = require('fs'),
  { readdirSync, existsSync, watch } = require('fs'),
  logg = require('pino'),
  pino = require('pino'),
  chalk = require('chalk'),
  path = require('path'),
  readline = require('readline'),
  axios = require('axios'),
  FileType = require('file-type'),
  CFonts = require('cfonts'),
  yargs = require('yargs/yargs'),
  _ = require('lodash'),
  { Boom } = require('@hapi/boom'),
  PhoneNumber = require('awesome-phonenumber'),
  { color, bgcolor } = require('./lib/color'),
  usePairingCode = true,
  {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
  } = require('./lib/exif'),
  {
    isUrl,
    generateMessageTag,
    getBuffer,
    getSizeMedia,
    getRandom,
    fetchJson,
    await,
    sleep,
  } = require('./lib/myfunc'),
  simple = require('./lib/simple'),
  question = (_0x35e81b) => {
    const _0x2fa8a2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    return new Promise((_0x30bdb3) => {
      _0x2fa8a2.question(_0x35e81b, _0x30bdb3)
    })
  }
var low
try {
  low = require('lowdb')
} catch (_0x1f87d9) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low,
  mongoDB = require('./lib/mongoDB'),
  store = makeInMemoryStore({
    logger: pino().child({
      level: 'silent',
      stream: 'store',
    }),
  })
global.db = new Low(new JSONFile('database/database.json'))
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((_0x3d2c88) =>
      setInterval(function () {
        !global.db.READ
          ? (clearInterval(conn),
            _0x3d2c88(
              global.db.data == null ? global.loadDatabase() : global.db.data
            ))
          : null
      }, 1000)
    )
  }
  if (global.db.data !== null) {
    return
  }
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    allcommand: [],
    anonymous: [],
    blockcmd: [],
    banned: [],
    premium: [],
    claim: [],
    data: [],
    sewa: [],
    antispam: [],
    dashboard: [],
    listerror: [],
    hittoday: [],
    clearchat: [],
    users: {},
    chats: {},
    settings: {},
    kickon: {},
    others: {},
    ...(global.db.data || {}),
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()
CFonts.say('          IKYY69', {
  font: 'chrome',
  align: 'left',
  gradient: ['red', 'magenta'],
})
console.log(
  color('INFO:', 'red'),
  color('\n1.', 'yellow'),
  color('Dilarang menjual script ini!.', 'yellow'),
  color('\n2.', 'yellow'),
  color('Dilarang menghilangkan copyright scipt ini!.\n', 'yellow')
)
async function connectToWhatsApp() {
  const { state: _0x4d9a5f, saveCreds: _0x4f6761 } =
      await useMultiFileAuthState('session'),
    _0x4dc5eb = makeInMemoryStore({
      logger: logg().child({
        level: 'fatal',
        stream: 'store',
      }),
    }),
    { isLatest: _0x46ded8 } = await fetchLatestBaileysVersion()
  if (global.db.data) {
    await global.db.write()
  }
  const _0x17bf6 = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: !usePairingCode,
    auth: _0x4d9a5f,
    browser: ['Chrome (Linux)', '', ''],
  })
  if (usePairingCode && !_0x17bf6.authState.creds.registered) {
    const _0x39efad = await question(
        'MASUKKAN NOMOR DENGAN AWALAN 62 UNTUK MENDAPATKAN PAIRING CODE || SC BY IKYY69\n'
      ),
      _0xb6a26c = await _0x17bf6.requestPairingCode(_0x39efad.trim())
    console.log('Pairing code: ' + _0xb6a26c)
  }
  const _0x18214a = {
    creds: _0x4d9a5f.creds,
    keys: makeCacheableSignalKeyStore(
      _0x4d9a5f.keys,
      logg().child({
        level: 'fatal',
        stream: 'store',
      })
    ),
  }
  _0x17bf6.decodeJid = (_0x5a6b67) => {
    if (!_0x5a6b67) {
      return _0x5a6b67
    }
    if (/:\d+@/gi.test(_0x5a6b67)) {
      let _0x4eecce = jidDecode(_0x5a6b67) || {}
      return (
        (_0x4eecce.user &&
          _0x4eecce.server &&
          _0x4eecce.user + '@' + _0x4eecce.server) ||
        _0x5a6b67
      )
    } else {
      return _0x5a6b67
    }
  }
  _0x17bf6.ev.on('messages.upsert', async (_0x425973) => {
    try {
      if (global.db.data) {
        await global.db.write()
      }
      if (!_0x425973.messages) {
        return
      }
      var _0x36c69f =
        _0x425973.messages[0] ||
        _0x425973.messages[_0x425973.messages.length - 1]
      if (!_0x36c69f.message) {
        return
      }
      if (
        _0x36c69f.key.id.startsWith('BAE5') &&
        _0x36c69f.key.id.length === 16
      ) {
        return
      }
      _0x36c69f = simple.smsg(_0x17bf6, _0x36c69f, _0x4dc5eb)
      require('./shizuka.js')(_0x17bf6, _0x36c69f, _0x425973, _0x4dc5eb)
    } catch (_0x46242a) {
      console.log(_0x46242a)
    }
  })
  _0x17bf6.ev.on('call', async (_0x3e50b1) => {
    let _0x50015f = await _0x17bf6.decodeJid(_0x17bf6.user.id),
      _0x2ec9e0 = global.anticall
    if (!_0x2ec9e0) {
      return
    }
    console.log(_0x3e50b1)
    for (let _0x2a2e87 of _0x3e50b1) {
      if (_0x2a2e87.isGroup == false) {
        if (_0x2a2e87.status == 'offer') {
          let _0x239c49 = await _0x17bf6.sendTextWithMentions(
            _0x2a2e87.from,
            '*' +
              _0x17bf6.user.name +
              '* tidak bisa menerima panggilan ' +
              (_0x2a2e87.isVideo ? 'video' : 'suara') +
              '. Maaf @' +
              _0x2a2e87.from.split('@')[0] +
              ' kamu akan diblokir. Silahkan hubungi Owner membuka blok !'
          )
          _0x17bf6.sendContact(
            _0x2a2e87.from,
            owner.map((_0x3c8ab9) => _0x3c8ab9.split('@')[0]),
            _0x239c49
          )
          await sleep(8000)
          await _0x17bf6.updateBlockStatus(_0x2a2e87.from, 'block')
        }
      }
    }
  })
  _0x17bf6.getName = (_0x5b2fd5, _0x283bfb = false) => {
    id = _0x17bf6.decodeJid(_0x5b2fd5)
    _0x283bfb = _0x17bf6.withoutContact || _0x283bfb
    let _0x2308cf
    if (id.endsWith('@g.us')) {
      return new Promise(async (_0x4fc8b9) => {
        _0x2308cf = _0x4dc5eb.contacts[id] || {}
        if (!(_0x2308cf.name || _0x2308cf.subject)) {
          _0x2308cf = _0x17bf6.groupMetadata(id) || {}
        }
        _0x4fc8b9(
          _0x2308cf.name ||
            _0x2308cf.subject ||
            PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber(
              'international'
            )
        )
      })
    } else {
      _0x2308cf =
        id === '0@s.whatsapp.net'
          ? {
              id: id,
              name: 'WhatsApp',
            }
          : id === _0x17bf6.decodeJid(_0x17bf6.user.id)
          ? _0x17bf6.user
          : _0x4dc5eb.contacts[id] || {}
    }
    return (
      (_0x283bfb ? '' : _0x2308cf.name) ||
      _0x2308cf.subject ||
      _0x2308cf.verifiedName ||
      PhoneNumber('+' + _0x5b2fd5.replace('@s.whatsapp.net', '')).getNumber(
        'international'
      )
    )
  }
  _0x17bf6.ev.on('groups.update', async (_0x2d6205) => {
    console.log(_0x2d6205)
    const _0x323674 = _0x2d6205[0]
    try {
      ppgroup = await _0x17bf6.profilePictureUrl(anu.id, 'image')
    } catch {
      ppgroup = 'https://tinyurl.com/yx93l6da'
    }
    if (_0x323674.announce == true) {
      await sleep(2000)
      let _0x783739 =
        '\u300C Group Settings Change \u300D\n\nGroup has been closed by admin, Now only admin can send messages !'
      _0x17bf6.sendMessage(_0x323674.id, {
        text: _0x783739,
        contextInfo: {
          externalAdReply: {
            title: '' + botName,
            body: '' + ownerName,
            thumbnailUrl: ppgroup,
            sourceUrl: 'https://chat.whatsapp.com/Fguw4KxsP6qCBm9RfZvHOS',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      })
    } else {
      if (_0x323674.announce == false) {
        await sleep(2000)
        _0x17bf6.sendMessage(_0x323674.id, {
          text: '\u300C Group Settings Change \u300D\n\nGroup has been opened by admin, Now participants can send messages !',
          contextInfo: {
            externalAdReply: {
              title: '' + botName,
              body: '' + ownerName,
              thumbnailUrl: ppgroup,
              sourceUrl: 'https://chat.whatsapp.com/Fguw4KxsP6qCBm9RfZvHOS',
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        })
      } else {
        if (_0x323674.restrict == true) {
          await sleep(2000)
          _0x17bf6.sendMessage(_0x323674.id, {
            text: '\u300C Group Settings Change \u300D\n\nGroup info has been restricted, Now only admin can edit group info !',
            contextInfo: {
              externalAdReply: {
                title: '' + botName,
                body: '' + ownerName,
                thumbnailUrl: ppgroup,
                sourceUrl: 'https://chat.whatsapp.com/Fguw4KxsP6qCBm9RfZvHOS',
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          })
        } else {
          if (_0x323674.restrict == false) {
            await sleep(2000)
            let _0x5dca34 =
              '\u300CGroup Settings Change \u300D\n\nGroup info has been opened, Now participant can edit group info !'
            _0x17bf6.sendMessage(_0x323674.id, {
              text: _0x5dca34,
              contextInfo: {
                externalAdReply: {
                  title: '' + botName,
                  body: '' + ownerName,
                  thumbnailUrl: ppgroup,
                  sourceUrl: 'https://chat.whatsapp.com/Fguw4KxsP6qCBm9RfZvHOS',
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            })
          } else {
            if (!_0x323674.desc == '') {
              await sleep(2000)
              let _0x54e143 =
                '\u300CGroup Settings Change \u300D\n\n*Group desk has been changed to*\n\n' +
                _0x323674.desc
              _0x17bf6.sendMessage(_0x323674.id, {
                text: _0x54e143,
                contextInfo: {
                  externalAdReply: {
                    title: '' + botName,
                    body: '' + ownerName,
                    thumbnailUrl: ppgroup,
                    sourceUrl:
                      'https://chat.whatsapp.com/Fguw4KxsP6qCBm9RfZvHOS',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                  },
                },
              })
            } else {
              await sleep(2000)
              let _0x5500d6 =
                '\u300CGroup Settings Change \u300D\n\n*Group Subject has been changed to*\n\n*' +
                _0x323674.subject +
                '*'
              _0x17bf6.sendMessage(_0x323674.id, {
                text: _0x5500d6,
                contextInfo: {
                  externalAdReply: {
                    title: '' + botName,
                    body: '' + ownerName,
                    thumbnailUrl: ppgroup,
                    sourceUrl:
                      'https://chat.whatsapp.com/Fguw4KxsP6qCBm9RfZvHOS',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                  },
                },
              })
            }
          }
        }
      }
    }
  })
  _0x17bf6.ev.on('group-participants.update', async (_0x4b59da) => {
    console.log(_0x4b59da)
    try {
      let _0x1fcad4 = await _0x17bf6.groupMetadata(_0x4b59da.id),
        _0x4c9042 = _0x4b59da.participants
      for (let _0x232ce7 of _0x4c9042) {
        try {
          ppuser = await _0x17bf6.profilePictureUrl(_0x232ce7, 'image')
        } catch {
          ppuser = 'https://tinyurl.com/yx93l6da'
        }
        try {
          ppgroup = await _0x17bf6.profilePictureUrl(_0x4b59da.id, 'image')
        } catch {
          ppgroup = 'https://tinyurl.com/yx93l6da'
        }
        if (_0x4b59da.action == 'add') {
          let _0x1dbc2d = fs.readFileSync('./temp/audio/welcome.mp3'),
            _0xc5a128 = {
              externalAdReply: {
                title:
                  'Welcome kak @' +
                  _0x232ce7.split('@')[0] +
                  'To ' +
                  _0x1fcad4.subject,
                body: 'Jangan lupa baca rules terlebih dahulu ya!',
                mediaType: 1,
                thumbnailUrl: ppuser,
                sourceUrl: 'https://chat.whatsapp.com/CyJRUV9qz5IGAAahA2ALA9',
                renderLargerThumbnail: true,
              },
            }
          _0x17bf6.sendMessage(_0x4b59da.id, {
            contextInfo: _0xc5a128,
            audio: _0x1dbc2d,
            mimetype: 'audio/mp4',
            ptt: true,
          })
        } else {
          if (_0x4b59da.action == 'remove') {
            let _0x6335eb = fs.readFileSync('./temp/audio/left.mp3'),
              _0x56b5b4 = {
                externalAdReply: {
                  title:
                    'See you \uD83D\uDC4B @' + _0x232ce7.split('@')[0] + ',',
                  body: 'Jangan lupa untuk kembali lagi ya!',
                  mediaType: 1,
                  thumbnailUrl: ppuser,
                  sourceUrl: 'https://chat.whatsapp.com/CyJRUV9qz5IGAAahA2ALA9',
                  renderLargerThumbnail: true,
                },
              }
            _0x17bf6.sendMessage(_0x4b59da.id, {
              contextInfo: _0x56b5b4,
              audio: _0x6335eb,
              mimetype: 'audio/mp4',
              ptt: true,
            })
          } else {
            if (_0x4b59da.action == 'promote') {
              let _0x18de49 =
                'Congrats @' +
                _0x232ce7.split('@')[0] +
                ', Kamu sudah menjadi admin group ' +
                _0x1fcad4.subject +
                ' \uD83C\uDF89'
              _0x17bf6.sendMessage(_0x4b59da.id, {
                text: _0x18de49,
                contextInfo: {
                  externalAdReply: {
                    title: '' + botName,
                    body: '' + ownerName,
                    thumbnailUrl: ppuser,
                    sourceUrl:
                      'https://chat.whatsapp.com/CyJRUV9qz5IGAAahA2ALA9',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                  },
                },
              })
            } else {
              if (_0x4b59da.action == 'demote') {
                let _0x21bf08 =
                  'Yah kak @' +
                  _0x232ce7.split('@')[0] +
                  ', kena demote awokawok'
                _0x17bf6.sendMessage(_0x4b59da.id, {
                  text: _0x21bf08,
                  contextInfo: {
                    externalAdReply: {
                      title: '' + botName,
                      body: '' + ownerName,
                      thumbnailUrl: ppuser,
                      sourceUrl:
                        'https://chat.whatsapp.com/CyJRUV9qz5IGAAahA2ALA9',
                      mediaType: 1,
                      renderLargerThumbnail: true,
                    },
                  },
                })
              }
            }
          }
        }
      }
    } catch (_0x16bc02) {
      console.log('Eror Di Bagian Welcome Group ' + _0x16bc02)
    }
  })
  _0x17bf6.sendContAngel = async (
    _0x2eac94,
    _0x31d80a,
    _0x3a7b14,
    _0x8fe06d,
    _0x31a6fc
  ) => {
    let _0x410412 =
        _0x31d80a.replace(new RegExp('[()+-/ +/]', 'gi'), '') +
        '@s.whatsapp.net',
      _0x15d9e7 =
        '\nBEGIN:VCARD\nVERSION:3.0\nFN:' +
        _0x3a7b14.replace(/\n/g, '\\n') +
        '\nTEL;type=CELL;type=VOICE;waid=' +
        _0x31d80a +
        ':' +
        PhoneNumber('+' + _0x31d80a).getNumber('international') +
        '\nEND:VCARD\n'
    return await _0x17bf6.sendMessage(
      _0x2eac94,
      {
        contacts: {
          displayName: '' + _0x3a7b14,
          contacts: [{ vcard: _0x15d9e7 }],
          ..._0x31a6fc,
        },
      },
      {
        quoted: _0x8fe06d,
        ..._0x31a6fc,
      }
    )
  }
  _0x17bf6.sendContact = async (
    _0x1e6b1f,
    _0x4a808b,
    _0x38f261 = '',
    _0x326123 = {}
  ) => {
    let _0x56d3eb = []
    for (let _0x1c79f9 of _0x4a808b) {
      _0x56d3eb.push({
        displayName: await _0x17bf6.getName(_0x1c79f9 + '@s.whatsapp.net'),
        vcard:
          'BEGIN:VCARD\nVERSION:3.0\nN:' +
          (await _0x17bf6.getName(_0x1c79f9 + '@s.whatsapp.net')) +
          '\nFN:' +
          (await _0x17bf6.getName(_0x1c79f9 + '@s.whatsapp.net')) +
          '\nitem1.TEL;waid=' +
          _0x1c79f9 +
          ':' +
          _0x1c79f9 +
          '\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:aplusscell@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://chat.whatsapp.com/HbCl8qf3KQK1MEp3ZBBpSf\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD',
      })
    }
    _0x17bf6.sendMessage(
      _0x1e6b1f,
      {
        contacts: {
          displayName: _0x56d3eb.length + ' Kontak',
          contacts: _0x56d3eb,
        },
        ..._0x326123,
      },
      { quoted: _0x38f261 }
    )
  }
  _0x17bf6.public = true
  _0x17bf6.ev.on('creds.update', _0x4f6761)
  _0x17bf6.downloadMediaMessage = async (_0x3c9e9d) => {
    let _0x7be976 = (_0x3c9e9d.msg || _0x3c9e9d).mimetype || '',
      _0x323256 = _0x3c9e9d.mtype
        ? _0x3c9e9d.mtype.replace(/Message/gi, '')
        : _0x7be976.split('/')[0]
    const _0x56811c = await downloadContentFromMessage(_0x3c9e9d, _0x323256)
    let _0x53bdbc = Buffer.from([])
    for await (const _0x253c59 of _0x56811c) {
      _0x53bdbc = Buffer.concat([_0x53bdbc, _0x253c59])
    }
    return _0x53bdbc
  }
  _0x17bf6.sendMedia = async (
    _0x200b03,
    _0x12c9c3,
    _0x5e8c07,
    _0x594429 = {}
  ) => {
    let {
      ext: _0x4fb109,
      mime: _0xa5fc4e,
      data: _0x38b647,
    } = await _0x17bf6.getFile(_0x12c9c3)
    return (
      (messageType = _0xa5fc4e.split('/')[0]),
      (pase = messageType.replace('application', 'document') || messageType),
      await _0x17bf6.sendMessage(
        _0x200b03,
        {
          ['' + pase]: _0x38b647,
          mimetype: _0xa5fc4e,
          ..._0x594429,
        },
        { quoted: _0x5e8c07 }
      )
    )
  }
  _0x17bf6.sendImage = async (
    _0x1c39b2,
    _0x2f9efb,
    _0x493d5a = '',
    _0x243bda = '',
    _0x13d45d
  ) => {
    let _0x559225 = Buffer.isBuffer(_0x2f9efb)
      ? _0x2f9efb
      : /^data:.*?\/.*?;base64,/i.test(_0x2f9efb)
      ? Buffer.from(_0x2f9efb.split`,`[1], 'base64')
      : /^https?:\/\//.test(_0x2f9efb)
      ? await await getBuffer(_0x2f9efb)
      : fs.existsSync(_0x2f9efb)
      ? fs.readFileSync(_0x2f9efb)
      : Buffer.alloc(0)
    return await _0x17bf6.sendMessage(
      _0x1c39b2,
      {
        image: _0x559225,
        caption: _0x493d5a,
        ..._0x13d45d,
      },
      { quoted: _0x243bda }
    )
  }
  _0x17bf6.sendText = (_0x51a968, _0xdfae50, _0x43c1f3 = '', _0x1c3622) =>
    _0x17bf6.sendMessage(
      _0x51a968,
      {
        text: _0xdfae50,
        ..._0x1c3622,
      },
      { quoted: _0x43c1f3 }
    )
  _0x17bf6.sendTextWithMentions = async (
    _0x479da4,
    _0x300b14,
    _0x155652,
    _0x3b22e4 = {}
  ) =>
    _0x17bf6.sendMessage(
      _0x479da4,
      {
        text: _0x300b14,
        contextInfo: {
          mentionedJid: [..._0x300b14.matchAll(/@(\d{0,16})/g)].map(
            (_0x378614) => _0x378614[1] + '@s.whatsapp.net'
          ),
        },
        ..._0x3b22e4,
      },
      { quoted: _0x155652 }
    )
  _0x17bf6.sendImageAsSticker = async (
    _0x59a791,
    _0x28ec02,
    _0x373393,
    _0x15bd43 = {}
  ) => {
    let {
        Sticker: _0x2082e9,
        StickerTypes: _0x2c683f,
      } = require('wa-sticker-formatter'),
      _0x4022d6 = new _0x2082e9(_0x28ec02, {
        pack: global.packName,
        author: global.authorName,
        type: _0x2c683f.FULL,
        categories: ['\uD83E\uDD29', '\uD83C\uDF89'],
        id: '12345',
        quality: 50,
        background: '#FFFFFF00',
      }),
      _0xc7ec33 = getRandom('.webp'),
      _0x83ed87 = await _0x4022d6.toFile(_0xc7ec33),
      _0x42ed2a = fs.readFileSync(_0x83ed87)
    return (
      await _0x17bf6.sendMessage(
        _0x59a791,
        {
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              title: 'Shizuka',
              body: '' + textT,
              previewType: 'PHOTO',
              thumbnail: fs.readFileSync('./media/shiz.jpeg'),
              sourceUrl: 'https://chat.whatsapp.com/DueXAtaI3QQ7jlRGxkMmsy',
            },
          },
          sticker: _0x42ed2a,
        },
        { quoted: _0x373393 }
      ),
      await fs.unlinkSync(_0xc7ec33)
    )
  }
  _0x17bf6.sendButtonText = (
    _0x5ed89a,
    _0x1caca9 = [],
    _0x168a10,
    _0x35e997,
    _0xbd743e = '',
    _0x453bad = {}
  ) => {
    let _0x28cd49 = {
      text: _0x168a10,
      footer: _0x35e997,
      buttons: _0x1caca9,
      headerType: 2,
      ..._0x453bad,
    }
    _0x17bf6.sendMessage(_0x5ed89a, _0x28cd49, {
      quoted: _0xbd743e,
      ..._0x453bad,
    })
  }
  _0x17bf6.sendVideoAsSticker = async (
    _0x28c31d,
    _0x51c42b,
    _0x72c2a4,
    _0x1a300e = {}
  ) => {
    let _0x134279 = Buffer.isBuffer(_0x51c42b)
        ? _0x51c42b
        : /^data:.*?\/.*?;base64,/i.test(_0x51c42b)
        ? Buffer.from(_0x51c42b.split`,`[1], 'base64')
        : /^https?:\/\//.test(_0x51c42b)
        ? await await getBuffer(_0x51c42b)
        : fs.existsSync(_0x51c42b)
        ? fs.readFileSync(_0x51c42b)
        : Buffer.alloc(0),
      _0x3514d8
    return (
      _0x1a300e && (_0x1a300e.packname || _0x1a300e.author)
        ? (_0x3514d8 = await writeExifVid(_0x134279, _0x1a300e))
        : (_0x3514d8 = await videoToWebp(_0x134279)),
      await _0x17bf6.sendMessage(
        _0x28c31d,
        {
          sticker: { url: _0x3514d8 },
          ..._0x1a300e,
        },
        { quoted: _0x72c2a4 }
      ),
      _0x3514d8
    )
  }
  _0x17bf6.downloadAndSaveMediaMessage = async (
    _0x105560,
    _0x480e3c,
    _0x453893 = true
  ) => {
    let _0x4a417a = _0x105560.msg ? _0x105560.msg : _0x105560,
      _0x3be7d7 = (_0x105560.msg || _0x105560).mimetype || '',
      _0x220c47 = _0x105560.mtype
        ? _0x105560.mtype.replace(/Message/gi, '')
        : _0x3be7d7.split('/')[0]
    const _0x5f49f1 = await downloadContentFromMessage(_0x4a417a, _0x220c47)
    let _0x3de390 = Buffer.from([])
    for await (const _0x1705b3 of _0x5f49f1) {
      _0x3de390 = Buffer.concat([_0x3de390, _0x1705b3])
    }
    let _0x12f5bf = await FileType.fromBuffer(_0x3de390)
    return (
      (trueFileName = _0x453893 ? _0x480e3c + '.' + _0x12f5bf.ext : _0x480e3c),
      await fs.writeFileSync(trueFileName, _0x3de390),
      trueFileName
    )
  }
  _0x17bf6.cMod = (
    _0x319050,
    _0x3984e0,
    _0x3236a4 = '',
    _0x27c8b3 = _0x17bf6.user.id,
    _0x1fbbb2 = {}
  ) => {
    let _0x3243ca = Object.keys(_0x3984e0.message)[0],
      _0x25c0cc = _0x3243ca === 'ephemeralMessage'
    _0x25c0cc &&
      (_0x3243ca = Object.keys(_0x3984e0.message.ephemeralMessage.message)[0])
    let _0xc6e21a = _0x25c0cc
        ? _0x3984e0.message.ephemeralMessage.message
        : _0x3984e0.message,
      _0x4e4fc4 = _0xc6e21a[_0x3243ca]
    if (typeof _0x4e4fc4 === 'string') {
      _0xc6e21a[_0x3243ca] = _0x3236a4 || _0x4e4fc4
    } else {
      if (_0x4e4fc4.caption) {
        _0x4e4fc4.caption = _0x3236a4 || _0x4e4fc4.caption
      } else {
        if (_0x4e4fc4.text) {
          _0x4e4fc4.text = _0x3236a4 || _0x4e4fc4.text
        }
      }
    }
    if (typeof _0x4e4fc4 !== 'string') {
      _0xc6e21a[_0x3243ca] = {
        ..._0x4e4fc4,
        ..._0x1fbbb2,
      }
    }
    if (_0x3984e0.key.participant) {
      _0x27c8b3 = _0x3984e0.key.participant =
        _0x27c8b3 || _0x3984e0.key.participant
    } else {
      if (_0x3984e0.key.participant) {
        _0x27c8b3 = _0x3984e0.key.participant =
          _0x27c8b3 || _0x3984e0.key.participant
      }
    }
    if (_0x3984e0.key.remoteJid.includes('@s.whatsapp.net')) {
      _0x27c8b3 = _0x27c8b3 || _0x3984e0.key.remoteJid
    } else {
      if (_0x3984e0.key.remoteJid.includes('@broadcast')) {
        _0x27c8b3 = _0x27c8b3 || _0x3984e0.key.remoteJid
      }
    }
    return (
      (_0x3984e0.key.remoteJid = _0x319050),
      (_0x3984e0.key.fromMe = _0x27c8b3 === _0x17bf6.user.id),
      proto.WebMessageInfo.fromObject(_0x3984e0)
    )
  }
  _0x17bf6.sendFile = async (
    _0x2650ff,
    _0x354126,
    _0x3663bf,
    _0x6505aa = {},
    _0x37d322 = {}
  ) => {
    let _0x1d1a12 = await _0x17bf6.getFile(_0x354126, true),
      {
        filename: _0x26b9ca,
        size: _0x154eb8,
        ext: _0x2e85a1,
        mime: _0x288cfc,
        data: _0xfcbd2d,
      } = _0x1d1a12,
      _0x17fac7 = '',
      _0x1fc201 = _0x288cfc,
      _0x1f944c = _0x26b9ca
    if (_0x37d322.asDocument) {
      _0x17fac7 = 'document'
    }
    if (_0x37d322.asSticker || /webp/.test(_0x288cfc)) {
      let { writeExif: _0x1718be } = require('./lib/sticker.js'),
        _0x144940 = {
          mimetype: _0x288cfc,
          data: _0xfcbd2d,
        }
      _0x1f944c = await _0x1718be(_0x144940, {
        packname: global.packname,
        author: global.packname2,
        categories: _0x37d322.categories ? _0x37d322.categories : [],
      })
      await fs.promises.unlink(_0x26b9ca)
      _0x17fac7 = 'sticker'
      _0x1fc201 = 'image/webp'
    } else {
      if (/image/.test(_0x288cfc)) {
        _0x17fac7 = 'image'
      } else {
        if (/video/.test(_0x288cfc)) {
          _0x17fac7 = 'video'
        } else {
          if (/audio/.test(_0x288cfc)) {
            _0x17fac7 = 'audio'
          } else {
            _0x17fac7 = 'document'
          }
        }
      }
    }
    return (
      await _0x17bf6.sendMessage(
        _0x2650ff,
        {
          [_0x17fac7]: { url: _0x1f944c },
          mimetype: _0x1fc201,
          fileName: _0x3663bf,
          ..._0x37d322,
        },
        {
          quoted: _0x6505aa,
          ..._0x37d322,
        }
      ),
      fs.promises.unlink(_0x1f944c)
    )
  }
  _0x17bf6.parseMention = async (_0x4f4c7e) => {
    return [..._0x4f4c7e.matchAll(/@([0-9]{5,16}|0)/g)].map(
      (_0x46cea9) => _0x46cea9[1] + '@s.whatsapp.net'
    )
  }
  _0x17bf6.copyNForward = async (
    _0x262f84,
    _0x41eca0,
    _0x2acb8f = false,
    _0x3e5a44 = {}
  ) => {
    let _0x5752ce
    _0x3e5a44.readViewOnce &&
      ((_0x41eca0.message =
        _0x41eca0.message &&
        _0x41eca0.message.ephemeralMessage &&
        _0x41eca0.message.ephemeralMessage.message
          ? _0x41eca0.message.ephemeralMessage.message
          : _0x41eca0.message || undefined),
      (_0x5752ce = Object.keys(_0x41eca0.message.viewOnceMessage.message)[0]),
      delete (_0x41eca0.message && _0x41eca0.message.ignore
        ? _0x41eca0.message.ignore
        : _0x41eca0.message || undefined),
      delete _0x41eca0.message.viewOnceMessage.message[_0x5752ce].viewOnce,
      (_0x41eca0.message = { ..._0x41eca0.message.viewOnceMessage.message }))
    let _0x31d056 = Object.keys(_0x41eca0.message)[0],
      _0x229f9e = await generateForwardMessageContent(_0x41eca0, _0x2acb8f),
      _0xb19006 = Object.keys(_0x229f9e)[0],
      _0x4b73ad = {}
    if (_0x31d056 != 'conversation') {
      _0x4b73ad = _0x41eca0.message[_0x31d056].contextInfo
    }
    _0x229f9e[_0xb19006].contextInfo = {
      ..._0x4b73ad,
      ..._0x229f9e[_0xb19006].contextInfo,
    }
    const _0x25eedd = await generateWAMessageFromContent(
      _0x262f84,
      _0x229f9e,
      _0x3e5a44
        ? {
            ..._0x229f9e[_0xb19006],
            ..._0x3e5a44,
            ...(_0x3e5a44.contextInfo
              ? {
                  contextInfo: {
                    ..._0x229f9e[_0xb19006].contextInfo,
                    ..._0x3e5a44.contextInfo,
                  },
                }
              : {}),
          }
        : {}
    )
    return (
      await _0x17bf6.relayMessage(_0x262f84, _0x25eedd.message, {
        messageId: _0x25eedd.key.id,
      }),
      _0x25eedd
    )
  }
  _0x17bf6.sendFile = async (
    _0xd8468,
    _0x2c350d,
    _0x11e5e7 = '',
    _0xf37eb0 = '',
    _0x39a2ca,
    _0x5224d9 = false,
    _0x503e3e = {}
  ) => {
    let _0xade409 = await _0x17bf6.getFile(_0x2c350d, true),
      { res: _0x463bc8, data: _0x44ed32, filename: _0x4ef844 } = _0xade409
    if ((_0x463bc8 && _0x463bc8.status !== 200) || _0x44ed32.length <= 65536) {
      try {
        throw { json: JSON.parse(_0x44ed32.toString()) }
      } catch (_0x1bc55b) {
        if (_0x1bc55b.json) {
          throw _0x1bc55b.json
        }
      }
    }
    let _0xa399aa = { filename: _0x11e5e7 }
    if (_0x39a2ca) {
      _0xa399aa.quoted = _0x39a2ca
    }
    if (!_0xade409) {
      if (_0x503e3e.asDocument) {
        _0x503e3e.asDocument = true
      }
    }
    let _0x2217ce = '',
      _0x135f8d = _0xade409.mime
    if (/webp/.test(_0xade409.mime)) {
      _0x2217ce = 'sticker'
    } else {
      if (/image/.test(_0xade409.mime)) {
        _0x2217ce = 'image'
      } else {
        if (/video/.test(_0xade409.mime)) {
          _0x2217ce = 'video'
        } else {
          if (/audio/.test(_0xade409.mime)) {
            _0x2217ce = 'audio'
            _0x135f8d = 'audio/ogg; codecs=opus'
          } else {
            _0x2217ce = 'document'
          }
        }
      }
    }
    return (
      await _0x17bf6.sendMessage(
        _0xd8468,
        {
          ..._0x503e3e,
          caption: _0xf37eb0,
          ptt: _0x5224d9,
          [_0x2217ce]: { url: _0x4ef844 },
          mimetype: _0x135f8d,
        },
        {
          ..._0xa399aa,
          ..._0x503e3e,
        }
      ),
      fs.unlinkSync(_0x4ef844)
    )
  }
  const _0xf887f4 = (_0x9c302a) => {
      console.log(_0x9c302a)
    },
    _0x51e0be = (_0x3a96ad) =>
      typeof _0x3a96ad === 'number' && !isNaN(_0x3a96ad)
  let _0x1b1f4a = new Date(),
    _0x76f621 = new Date(0).getTime() - new Date('1 Januari 2021').getTime(),
    _0x3a6140 = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][
      Math.floor((_0x1b1f4a * 1 + _0x76f621) / 84600000) % 5
    ],
    _0x3fec52 = _0x1b1f4a.toLocaleDateString('id', { weekday: 'long' })
  const _0x1bf3e9 = _0x1b1f4a.toLocaleDateString('id', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    _0xa3202b = (_0x168b61) => {
      let _0x16478a = _0x168b61
        .split(' ')
        .map(
          (_0x14e8c8) => _0x14e8c8.charAt(0).toUpperCase() + _0x14e8c8.slice(1)
        )
        .join(' ')
      return _0x16478a
    }
  return (
    (_0x17bf6.getFile = async (_0x16a1e5, _0x34b13a) => {
      let _0x599b7f,
        _0x8d55a9 = Buffer.isBuffer(_0x16a1e5)
          ? _0x16a1e5
          : /^data:.*?\/.*?;base64,/i.test(_0x16a1e5)
          ? Buffer.from(_0x16a1e5.split`,`[1], 'base64')
          : /^https?:\/\//.test(_0x16a1e5)
          ? await (_0x599b7f = await getBuffer(_0x16a1e5))
          : fs.existsSync(_0x16a1e5)
          ? ((filename = _0x16a1e5), fs.readFileSync(_0x16a1e5))
          : typeof _0x16a1e5 === 'string'
          ? _0x16a1e5
          : Buffer.alloc(0),
        _0x3003e6 = (await FileType.fromBuffer(_0x8d55a9)) || {
          mime: 'application/octet-stream',
          ext: '.bin',
        }
      filename = path.join(
        __filename,
        '../src/' + new Date() * 1 + '.' + _0x3003e6.ext
      )
      if (_0x8d55a9 && _0x34b13a) {
        fs.promises.writeFile(filename, _0x8d55a9)
      }
      return {
        res: _0x599b7f,
        filename: filename,
        size: await getSizeMedia(_0x8d55a9),
        ..._0x3003e6,
        data: _0x8d55a9,
      }
    }),
    (_0x17bf6.serializeM = (_0x415bd2) => smsg(_0x17bf6, _0x415bd2, _0x4dc5eb)),
    _0x17bf6.ev.on('connection.update', async (_0x2a756c) => {
      const { connection: _0x1e2b26, lastDisconnect: _0x6b9a8f } = _0x2a756c
      if (_0x1e2b26 === 'close') {
        let _0x28838c = new Boom(_0x6b9a8f?.error)?.output.statusCode
        if (_0x28838c === DisconnectReason.badSession) {
          console.log('Bad Session File, Please Delete Session and Scan Again')
          process.exit()
        } else {
          if (_0x28838c === DisconnectReason.connectionClosed) {
            console.log('Connection closed, reconnecting....')
            connectToWhatsApp()
          } else {
            if (_0x28838c === DisconnectReason.connectionLost) {
              console.log('Connection Lost from Server, reconnecting...')
              connectToWhatsApp()
            } else {
              if (_0x28838c === DisconnectReason.connectionReplaced) {
                console.log(
                  'Connection Replaced, Another New Session Opened, Please Restart Bot'
                )
                process.exit()
              } else {
                if (_0x28838c === DisconnectReason.loggedOut) {
                  console.log(
                    'Device Logged Out, Please Delete Folder Session yusril and Scan Again.'
                  )
                  process.exit()
                } else {
                  if (_0x28838c === DisconnectReason.restartRequired) {
                    console.log('Restart Required, Restarting...')
                    connectToWhatsApp()
                  } else {
                    _0x28838c === DisconnectReason.timedOut
                      ? (console.log('Connection TimedOut, Reconnecting...'),
                        connectToWhatsApp())
                      : (console.log(
                          'Unknown DisconnectReason: ' +
                            _0x28838c +
                            '|' +
                            _0x1e2b26
                        ),
                        connectToWhatsApp())
                  }
                }
              }
            }
          }
        }
      } else {
        _0x1e2b26 === 'open' &&
          (console.log(
            '' +
              (color('[', 'white') + color('2', 'blue') + color(']', 'white')),
            '' + _0x1bf3e9
          ),
          console.log(
            '' +
              (color('[', 'white') + color('3', 'blue') + color(']', 'white')),
            'BASE : SHIZUKA'
          ),
          console.log(
            color('\u2500[', 'magenta'),
            '\u300C',
            color('IKYY69', 'blue'),
            '\u300D',
            color(']\u2500', 'magenta')
          ),
          _0x17bf6.sendMessage('6281281872699@s.whatsapp.net', {
            text: 'Hai Owner!',
          }))
      }
    }),
    (global.Log = _0xf887f4),
    (global.isNumber = _0x51e0be),
    (global.week = _0x3fec52),
    (global.toFirstCase = _0xa3202b),
    (global.calender = _0x1bf3e9),
    _0x17bf6
  )
}
connectToWhatsApp()
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright('Update ' + __filename))
  delete require.cache[file]
  require(file)
})
